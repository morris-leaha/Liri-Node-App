require("dotenv").config();

var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);