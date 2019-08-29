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
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&tomatoes=true&apikey=trilogy")
        .then(function (response) {
            var movieResults = "\nMovie Title: " + response.data.Title + "\nYear of Release: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating  + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry Produced: " + response.data.Country + "\nLanguage " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
            fs.appendFile('./log.txt', command + movieResults+ "\n", 'utf8', function(err){
                    console.log(err);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response.data);
            if (response.data.length === 0) {
                console.log("No upcoming events founds");
            }
            else {
                for (var i = 0; i < response.data.length; i++) {
                    var concertResults = "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\nDate of the event: " + moment(response.data[i].datetime).format("MM-DD-YYYY");
                    console.log(concertResults);
                }
                fs.appendFile('./log.txt', command + concertResults + "\n", 'utf8', function(err){
                    console.log(err);
            });
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function doWhat(value) {
    var contents = fs.readFileSync('random.txt', 'utf8')
    var content = contents.split(",");
    spotifyThis(content[1]);
}

function spotifyThis(value) {
    spotify.search({ type: 'track', query: value, limit: 1 }, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
        var artistResults = "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name + "\nPreview on Spotify " + data.tracks.items[0].uri + "\nAlbum " + data.tracks.items[0].album.name
        console.log(artistResults);
        }
        fs.appendFile('./log.txt', command + artistResults + "\n", 'utf8', function(err){
            console.log(err);
    });
});
}
