# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The Commands are:

concert-this

spotify-this-song

movie-this

do-what-it-says

Technologies Used - 
Node.js,
JavaScript,
BandsinTown API (via BandsinTown npm module),
Spotify API (via spotify npm module),
OMDb API (via request npm module)

Code Explanation

Authentication keys for Spotify are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
What our app does depends on what the user types, and there are 4 main functions: (1) prints latest concerts for artist searched, (2) Spotify lookup for a song, (3) OMDb lookup for a movie, and (4) read command and query from another file

The program makes a request to the BandsinTown API -- giving a list of the latest concerts
The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)
The program also reads from a file called "random.text" and executes the command and query found there using string and array methods
