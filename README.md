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

HOW TO USE LIRI

Step by Step instructions
Open your terminal such as Bash.

Navigate to the folder that contains the liri.js file.

Depending on the command you run, the output will vary.

Example 1: Run the concert-this command

 ```node liri.js concert-this <name of artist or band>```
Output: The system will display a list of all events and locations where the artist or band will perform. It can result in multiple records. The system will also log all the results in the log.txt file. 
  
Example 2: Run the spotify-this-song command

```node liri.js spotify-this-song <name of song>```
Output: The system will display a list of information associated with the song. It can result in multiple records. The system will also log all the results in the log.txt file.
  
Example 3: Run the movie-this command

 ```node liri.js movie-this <name of movie>```
Output: The system will display information associated with the movie. The system will also log all the results in the log.txt file.
  
Example 4: Run the do-what-it-says command
``` node liri.js do-what-it-says```
Output: The system will read the text in the random.txt file, and perform the comman listed in the random.txt file.



