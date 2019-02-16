// require information from .env file (copied from dotenv documentation)
// only need to do once so don't need to store in variable
require("dotenv").config();

// store all other necessary node packages in variables to use throughout 
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var axios = require("axios");

// allows us to use special keys from keys.js (per instructions)
var spotify = new Spotify(keys.spotify);

// =====================USER INPUT & SWITCH CASES TO CALL FUNCTIONS=============================
// (referenced from in class activity 15-BankJS):

// store user input (or action requested) in variable
var action = process.argv[2];

// use switch case to direct which function will run with command line code
switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doWhat();
        break;

    default:
        console.log("Please check your command -- I don't understand!");
}

// =====================FUNCTIONS=============================
// (adapted from in class activities)

function concert() {
    var artistName = process.argv[3];

    var qURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    // console.log(qURL);

    // make GET request adapted from axios documentation (https://www.npmjs.com/package/axios)
    axios.get(qURL).then(function (response) {
        // console.log(response.data);

        // loop through response.data.legnth to display:
        for (var i = 0; i < response.data.length; i++) {
            console.log("---------------------------");
            // display artist name
            console.log("Artist: " + artistName);
            // display line-up
            var lineUp = response.data[i].lineup;
            console.log("Lineup: " + lineUp);
            // 1. name of venue
            var venueName = response.data[i].venue.name;
            console.log("Venue: " + venueName);
            // 2. venue location
            var venueLocation = response.data[i].venue.city;
            console.log("Location: " + venueLocation);
            // 3. date of the event (MM/DD/YYYY)
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
            console.log("Date: " + date);
            console.log("---------------------------");

            // output data to log.txt
            var result = ("Artist: " + artistName + "\n" + "Lineup: " + lineUp + "\n" + "Venue: " + venueName + "\n" + "Location: " + venueLocation + "\n" + "Date: " + date);
            writeData(action, result);

        }
    })
        .catch(function (error) { // handling errors per axios documentation (https://www.npmjs.com/package/axios)
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
}

function spotifyThis() {
    var songInput = process.argv[3];

    // if user doesn't input a song, default to 'The Sign' by Ace of Base
    // put artist instead of song -- fellow colleagues identified the problem that using the song name 'The Sign' did not result in Ace of Base as the artist 
    if (!songInput) {
        songInput = 'Ace of Base';
    }

    // search node-spotify-api per documentation (https://www.npmjs.com/package/node-spotify-api)
    spotify.search({ type: 'track', query: songInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("---------------------------");
        // 1. display artist name
        var artist = data.tracks.items[0].album.artists[0].name;
        console.log("Artist: " + artist);
        // 2. display song name
        var songTitle = data.tracks.items[0].name;
        console.log("Song: " + songTitle);
        // 3. display the album
        var albumTitle = data.tracks.items[0].album.name;
        console.log("Album: " + albumTitle);
        // 4. display link to preview song on spotify
        var spotifyURL = data.tracks.items[0].external_urls.spotify;
        console.log("Preview song on spotify here: " + spotifyURL);
        console.log("---------------------------");

        // output data to log.txt
        var result = ("Search term: " + songInput + "\n" + "Artist: " + artist + "\n" + "Song: " + songTitle + "\n" + "Album: " + albumTitle + "\n" + "Spotify URL: " + spotifyURL);
        writeData(action, result);
    });
}

function movie() {
    // var movie = process.argv[3].split(" ").join("+");
    var movie = process.argv[3];

    if (!movie) {
        movie = "Mr.Nobody";
    }

    // query URL for OMDB via documentation (http://omdbapi.com/)
    var qURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
    console.log(qURL);

    // make GET request adapted from axios documentation (https://www.npmjs.com/package/axios)
    axios.get(qURL).then(function (response) {
        // console.log(response.data);

        console.log("---------------------------");
        // 1. title of movie
        var movieTitle = response.data.Title;
        console.log("Title: " + movieTitle);
        // 2. year movie came out
        var releaseYear = response.data.Year;
        console.log("Release Year: " + releaseYear);
        // 3. IMDB rating
        var rateIMDB = response.data.imdbRating;
        console.log("IMDB Rating: " + rateIMDB);
        // 4. Rotten Tomatoes rating
        var rateRotten = response.data.Ratings[1].Value;
        console.log("Rotten Tomatoes Rating: " + rateRotten);
        // 5. Country movie was produced in
        var country = response.data.Country;
        console.log("Produced in: " + country);
        // 6. language of movie
        var language = response.data.Language;
        console.log("Language: " + language);
        // 7. plot
        var plot = response.data.Plot;
        console.log("Plot: " + plot);
        // 8. actors
        var actors = response.data.Actors;
        console.log("Actors: " + actors);
        console.log("---------------------------");

        // output data to log.txt
        var result = ("Search term: " + movie + "\n" + "Title: " + movieTitle + "\n" + "Release Year: " + releaseYear + "\n" + "IMDB Rating: " + rateIMDB + "\n" + "Rotten Tomatoes Rating: " + rateRotten + "\n" + "Produced in: " + country + "\n" + "Language: " + language + "\n" + "Plot: " + plot + "\n" + "Actors: " + actors);
        writeData(action, result);

    })
        .catch(function (error) { // handling errors per axios documentation (https://www.npmjs.com/package/axios)
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

}

function doWhat () {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) { // adapted from in class activity 12-ReadFile
        if (error) {
            return console.log(error);
        }
        // split text (at comma) and put into an array --> store in variable
        var dataArr = data.split(",");
        // console.log(dataArr);

        // action = dataArr[0]; (uncomment if you want command in log.txt to be 'spotify-this-song')
        process.argv[3] = dataArr[1]; // set "I Want it That Way" text (at index 1 of dataArr) to be "search term"

        if (dataArr[0] === 'spotify-this-song') {
            spotifyThis(process.argv[3]);
        }
    });
}


// =====================LOG ANSWERS=============================
// (adapted from in class activity 14-AppendFile)

function writeData (action, result) {
    var fs = require("fs");
    var text = ("------------" + "\n" + "Command: " + action + "\n" + result + "\n" + "------------" + "\n");

    fs.appendFile("log.txt", text, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Your results were added!");
        }
    })
}





