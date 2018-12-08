var axios = require("axios");
var Spotify = require("node-spotify-api");
var nodeArgs = process.argv;
var movieName = "";
var movieDefault = 'Mr. Nobody';


require("dotenv").config();

var keys = require('./keys.js');

var spotifyClient = new Spotify(keys.spotify);

console.log(spotifyClient);

    
// https://rest.bandsintown.com/artists/" + artist + "/events?app_id=fbd9243030e50e0475cd78765e9cb68a
    

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
    else {
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