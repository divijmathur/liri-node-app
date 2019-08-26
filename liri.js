// var userInput = process.argv;
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify ({
//     id: "ae69391e6794483589176782528ca45f",
//     secret: "1ac1a1df5c864959bcbf2eadbfd59e03"
// });
// spotify.search({
//     type: "track",
//     query: "All the Small Things"
// }, function(err, data){
//     if (err) {
//         console.log(err);
//     }
//     console.log(data);
// });

const axios = require('axios');
var fs = require('fs');
var command = process.argv[2];
var value = process.argv[3];
switch (command) {
    case "movie-this":
        movieThis(value);
        break;
    
    case "concert-this":
        concertThis(value);
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
    axios.get("https://rest.bandsintown.com/event/13722599?app_id=foo&artist=" + value + "&came_from=67")
}