// require information from .env file (copied from dotenv documentation)
// only need to do once so don't need to store in variable
require("dotenv").config();

// store all other necessary node packages in variables to use throughout 
var keys = require("./keys.js");
var moment = require("moment");
// var Spotify = require("node-spotify-api");
var axios = require("axios");

// allows us to use special keys from keys.js 
// var spotify = new Spotify(keys.spotify);

// =====================USER INPUT & SWITCH CASES TO CALL FUNCTIONS=============================
// (referenced in class activity 15-BankJS):

// store user input (or action requested) in variable
var action = process.argv[2];

// use switch case to direct which function will run with command line code
switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotify();
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
        .catch(function (error) {
            console.log(error.response);
        });
}


// function spotify () {

// }

// function movie () {

// }

// function doWhat () {

// }





