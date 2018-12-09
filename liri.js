var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var nodeArgs = process.argv;
var movieName = "";
var movieDefault = 'Mr. Nobody';
var artistName = '';
var defaultArtist ='Panic! At The Disco';


require("dotenv").config();

var keys = require('./keys.js');

var spotifyClient = new Spotify(keys.spotify);

// console.log(spotifyClient);

    
// https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=fbd9243030e50e0475cd78765e9cb68a
    
// https://rest.bandsintown.com/artists/Skrillex/events?app_id=fbd9243030e50e0475cd78765e9cb68a




if(process.argv[2] === "concert-this" && process.argv[3] !== undefined) {
  //handling spaces in the request if needed
  for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        artistName = artistName + "+" + nodeArgs[i];
      }
      else {
        artistName += nodeArgs[i];
      }
    }
    
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=fbd9243030e50e0475cd78765e9cb68a";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        // console.log(response.data);
        console.log('[Artist] : ' + artistName);
        console.log('___________________________');
      for(var i=0; i < response.data.length; i++){
        console.log('[Venue] : ' + response.data[i].venue.name);
        console.log('[City] : ' + response.data[i].venue.city);
        console.log('[When] : ' + moment(response.data[i].datetime).format('MM-DD-YYYY hh:mm'));
        

        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        console.log('---------------------------');
      }
    }
  );

} else if (process.argv[2] === "concert-this" && process.argv[3] === undefined){
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      artistName = artistName + "+" + nodeArgs[i];
    }
    else {
      artistName += nodeArgs[i];
    }
  }
  
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "https://rest.bandsintown.com/artists/" + defaultArtist + "/events?app_id=fbd9243030e50e0475cd78765e9cb68a";
  
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  axios.get(queryUrl).then(
    function(response) {
      // console.log(response.data);
      console.log('[Artist] : ' + defaultArtist);
      console.log('___________________________');
    for(var i=0; i < response.data.length; i++){
      console.log('[Venue] : ' + response.data[i].venue.name);
      console.log('[City] : ' + response.data[i].venue.city);
      console.log('[When] : ' + moment(response.data[i].datetime).format('MM-DD-YYYY hh:mm'));
      // Date of the Event (use moment to format this as "MM/DD/YYYY")
      console.log('---------------------------');
    }
  }
);

}






    //if the arguments are movie related and actually DO have a request from user then run this
    if(process.argv[2] === "movie-this" && process.argv[3] !== undefined) {
        //handling spaces in the request if needed
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
              movieName = movieName + "+" + nodeArgs[i];
            }
            else {
              movieName += nodeArgs[i];
            }
          }
          
          // Then run a request with axios to the OMDB API with the movie specified
          var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=127a5741";
          
          // This line is just to help us debug against the actual URL.
          console.log(queryUrl);
          
          axios.get(queryUrl).then(
            function(response) {
              console.log("[Title]:" + response.data.Title);
              console.log("[Year]:" + response.data.Year);
              console.log("[IMDB Rating]:" + response.data.imdbRating);
              console.log("[Rotten Tomatoes Rating]:" + response.data.Ratings[1].Value);
              console.log("[Produced In]:" + response.data.Country);
              console.log("[Language]:" + response.data.Language);
              console.log("[Plot]:" + response.data.Plot);
              console.log("[Actors]:" + response.data.Actors);

            }
          );
    
    } 
    //if the user does not insert a request then default to mr nobody
    else if (process.argv[2] === "movie-this" && process.argv[3] === undefined){
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieDefault + "&y=&plot=short&apikey=127a5741";
          
        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);
        
        axios.get(queryUrl).then(
          function(response) {
            console.log("[Title]:" + response.data.Title);
            console.log("[Year]:" + response.data.Year);
            console.log("[IMDB Rating]:" + response.data.imdbRating);
            console.log("[Rotten Tomatoes Rating]:" + response.data.Ratings[1].Value);
            console.log("[Produced In]:" + response.data.Country);
            console.log("[Language]:" + response.data.Language);
            console.log("[Plot]:" + response.data.Plot);
            console.log("[Actors]:" + response.data.Actors);

          }
        );
    }