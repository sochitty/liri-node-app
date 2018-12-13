var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var fs = require('fs');
var nodeArgs = process.argv;
var movieName = "";
var movieDefault = 'Mr. Nobody';
var artistName = '';
var defaultArtist ='Panic! At The Disco';
var songName = '';
var songDefault = 'hello';


require("dotenv").config();

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

// console.log(spotifyClient);

//DO-WHAT-IT-SAYS
if(process.argv[2] === 'do-what-it-says' && process.argv[3] === undefined){
// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
var content;
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  // Break the string down by comma separation and store the contents into the output array.
  // var output = data.split(",");
  content = data.split(",");
  
  if(content[0] === 'spotify-this-song'){
    spotify.search({ type: 'track', query: content[1], limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //song name for debugging
      // console.log(songName);
      //parses all data for debugging
      // console.log(JSON.stringify(data, null, 2)); 
  //artist name
  console.log('[Artist] : ' + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
  //songs name
  console.log('[Song] : ' + JSON.stringify(data.tracks.items[0].name, null, 2)); 
  //external url
  console.log('[URL] : ' + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2)); 
  //album name
  console.log('[Album] : ' + JSON.stringify(data.tracks.items[0].album.name, null, 2)); 
  
  
    });
  } else if(content[0] === 'movie-this'){
    for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      }
      else {
        movieName += nodeArgs[i];
      }
    }
    
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + content[1] + "&y=&plot=short&apikey=127a5741";
    
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    
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
});
}


//SPOTIFY-THIS-SONG
if(process.argv[2] === 'spotify-this-song' && process.argv[3] !== undefined){
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songName = songName + "+" + nodeArgs[i];
    }
    else {
      songName += nodeArgs[i];
    }
  }

  spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //song name for debugging
    // console.log(songName);
    //parses all data for debugging
    // console.log(JSON.stringify(data, null, 2)); 
//artist name
console.log('[Artist] : ' + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
//songs name
console.log('[Song] : ' + JSON.stringify(data.tracks.items[0].name, null, 2)); 
//external url
console.log('[URL] : ' + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2)); 
//album name
console.log('[Album] : ' + JSON.stringify(data.tracks.items[0].album.name, null, 2)); 


  });

} else if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined){
  spotify.search({ type: 'track', query: songDefault, limit: 5 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


    //artist name
console.log('[Artist] : ' + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
//songs name
console.log('[Song] : ' + JSON.stringify(data.tracks.items[0].name, null, 2)); 
//external url
console.log('[URL] : ' + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2)); 
//album name
console.log('[Album] : ' + JSON.stringify(data.tracks.items[0].album.name, null, 2)); 
  });
}

//CONCERT-THIS
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



//MOVIE-THIS


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
          // console.log(queryUrl);
          
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