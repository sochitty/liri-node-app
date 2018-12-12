# liri-node-app
## Liri: Language Interpretation and Recognition Interface Project

We will be using terminal to make our commands to liri and getting a response of some sort.

### concert-this
`node liri.js concert-this <artist>`
This will respond using the BandsInTown API and give us the artist we chose upcoming concerts such as 
*  **venue name**
*  **venue location**
*  **date/time of the event.**

[concert-this Example](https://www.youtube.com/watch?v=p-5iCVV-524)

###  movie-this
`node liri.js movie-this <movie>`
This will respond using the OMDB API and give us the movie we chose with the following
*  **Title of the movie**
*  **Year the movie came out**
*  **IMDB rating of the movie**
*  **Rotten Tomatoes rating of the movie**
*  **Country where the movie was produced**
*  **Language of the movie**
*  **Plot of the movie**
*  **Actors in the movie**

[movie-this Example](https://www.youtube.com/watch?v=Oqfj8xKaRkY)

### spotify-this-song
`node liri.js spotify-this-song <song name>` This will use the Spotify API and give us back information about the song such as
*  **Artist Name**
*  **Song Name**
*  **Preview Link**
*  **Album Name**

[spotify-this-song Example](#)

### do-what-it-says
```node liri.js do-what-it-says``` This will read the *random.txt* file and give us back whatever is in that file. Currently it says to *spotify-this song 'I want it that way'* which will return the spotify function of

*  **Artist Name**
*  **Song Name**
*  **Preview Link**
*  **Album Name**

[do-what-it-says Example](#)





