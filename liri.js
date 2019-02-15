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
        console.log("Please check your command!");
}

// =====================FUNCTIONS=============================
// (adapted from in class activities)

function concert() {
    var artist = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data);

            // loop through response.data.legnth to display:
                // 1. name of venue
                    // console.log("Venue " + response.data.venue.nameorsomething);
                // 2. venue location
                    // console.log("Venue Location: " + response.data.venue.locationorsomething);
                // 3. date of the event 
                    // (use moment to format at MM/DD/YYYY)
                        // store response.data.dateorwhater in variable
                            // var date = moment(response.data.dateorwhatever).format("MM/DD/YYYY");
                    // console.log("Date: " + date);
        })
}


function spotify () {

}

function movie () {

}

function doWhat () {
    
}





