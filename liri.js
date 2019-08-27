require("dotenv").config();
var keys = require("./keys.js")
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
var fs = require('fs');
var moment = require('moment');
moment().format();
var command = process.argv[2];
var value = process.argv[3];
switch (command) {
    case "movie-this":
        movieThis(value);
        break;
    
    case "concert-this":
        concertThis(value);
        break;

    case "do-what-it-says":
        doWhat(value);
        break;
    
    case "spotify-this-song":
        spotifyThis(value);
        break;
}

function movieThis(value) {
    if (!value) {
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        var movieResults = "\nMovie Title " + response.data.Title + "\nYear of Release " + response.data.Year + "\nIMDB Rating " + response.data.imdbRating + "\nRotten Tomatoes " + response.data.Ratings[1].Value + "\nCountry Produced " + response.data.Country + "\nLanguage " + response.data.Language + "\nPlot " + response.data.Plot + "\nActors/Actresses " + response.data.Actors;
        console.log(movieResults);
    })
    .catch(function(err) {
        console.log(err);
    })
}
// build api call for bands in town after receiving personal app id from them
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events&app_id=6d566b33d3c4271daf35c85ea1d7a9f9")
    .then(function(response){
        // console.log(response.data);
        for(var i = 0; i < response.data.length; i++) {
            var datetime = response.data[i].datetime;
            var dateArr = datetime.split("T");
            var concertResults = "\nVenue Name " + response.data[i].venue.name + "\nVenue Location " + response.data[i].venue.city + "\nDate of the event " + moment(dateArr[0], "MM-DD-YYYY");
            console.log(concertResults);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

function doWhat(value) {
    fs.readFile('random.txt','utf8', function(err,data) {
        if (error) {
            console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
}

function spotifyThis(value) {
    spotify.search({ type: 'track', query: value, limit: 1}, function(err,data) {
        if(err) {
            return console.log(err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Preview on Spotify " + data.tracks.items[0].uri);
        console.log("Album " + data.tracks.items[0].album.name);
    });
}
