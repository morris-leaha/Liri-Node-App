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

    axios.get(qURL).then(function (response) {
        // console.log(response.data);

        // loop through response.data.legnth to display:
        for (var i = 0; i < response.data.length; i++) {
            console.log("---------------------------");
            // display artist name
            console.log("Artist: " + artistName);
            // display line-up
            console.log("Lineup: " + response.data[i].lineup);
            // 1. name of venue
            console.log("Venue: " + response.data[i].venue.name);
            // 2. venue location
            console.log("Location: " + response.data[i].venue.city);
            // 3. date of the event (MM/DD/YYYY)
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
            console.log("Date: " + date);
            console.log("---------------------------");
            
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
    var song = process.argv[3];

    // search node-spotify-api per documentation (https://www.npmjs.com/package/node-spotify-api)
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("---------------------------");
        // 1. display artist name
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        // 2. display song name
        console.log("Song: " + data.tracks.items[0].name);
        // 3. display the album
        console.log("Album: " + data.tracks.items[0].album.name);
        // 4. display link to preview song on spotify
        console.log("Preview song on spotify here: " + data.tracks.items[0].external_urls.spotify);
        console.log("---------------------------");
    });
}

// function movie () {

// }

// function doWhat () {

// }





