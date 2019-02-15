// require information from .env file (copied from dotenv documentation)
// only need to do once so don't need to store in variable
require("dotenv").config();

// store all other necessary node packages in variables to use throughout 
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var axios = require("axios");

// allows us to use special keys from keys.js 
var spotify = new Spotify(keys.spotify);

// =====================USER INPUT & SWITCH CASES TO CALL FUNCTIONS=============================

// store user input in variable
var userInput = process.argv[2];

// use switch case to direct which function will run with command line code
switch (userInput) {
    case "concert-this":
        concert ();
        break;

    case "spotify-this-song":
        spotify ();
        break;
    
    case "movie-this":
        movie ();
        break;

    case "do-what-it-says":
        doWhat ();
        break;
    
    default:
        console.log("Please check your command!");
}

