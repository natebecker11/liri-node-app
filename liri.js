
// dependencies
require("dotenv").config()
const Spotify = require('node-spotify-api')
const request = require('request')
const moment = require('moment')
moment().format();
const keys = require('./keys.js')
const spotify = new Spotify(keys.spotify);
const fs = require('fs');



// concert-this function
const concertSearch = (artist = 'LCD Soundsystem') => {
  console.log(`Looking up concerts for ${artist}, this may take a moment!`)
  // call the bandsintown API
  request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', (err, resp, body) => {
    // check for success
    if (!err && resp.statusCode === 200) {
      // Inform user whether any concerts are upcoming
      console.log(!!JSON.parse(body)[0] ? `Here are the upcoming concerts for ${artist}` : `No concerts scheduled for ${artist} at this time.`)
      // for each entry
      JSON.parse(body).forEach(entry => {
        // grab venue name, city/region/country
        let name = entry['venue']['name']
        let city = entry['venue']['city']
        let region = entry['venue']['region']
        let country = entry['venue']['country']
        // grab date, format it
        let date = moment(entry['datetime']).format('dddd, MMMM Do YYYY, h:mmA');
        // if there's a region, log out this way
        if (region) {
          console.log('------\n', name+'\n', `${city}, ${region}, ${country}\n`, date)
        }
        // else log out this way
        else {
          console.log('------\n', name+'\n', `${city}, ${country}\n`, date)
        }
      })     
    }
  })
}

// spotify-this-song function
const spotifySearch = (song = 'The Sign Ace of Base') => {
  // call the node-spotify-api module
  spotify
    // search for the given song
    .search(
      {
        type: 'track',
        query: song
      },
      (err, data) => {
        // handle errors
        if (err) {
          return console.log(`Error occurred: ${err}`)
        }
        // bind the first result, could return multiple, however spotify tends to give a whole lot of irrelevant results
        let firstResult = data['tracks']['items'][0];
        // if no results are found, inform user and return
        if (!firstResult) return console.log('No results found.')
        // build a list of artists
        let artists = firstResult['artists']
          // grab the artist name from the object, add it on to the list
          .reduce((list, artist) => {
            return list += artist['name'] + ', '
            },''
          )
          // remove the final comma and space from the string
          .slice(0, -2)
        // grab the song name and album
        let songName = firstResult['name']
        let album = firstResult['album']['name']        
        // If a preview url is available, get that. Otherwise, get the full song url
        let prevUrl = firstResult['preview_url'] ? 'Preview: ' + firstResult['preview_url'] : 'Listen here (requires account): ' + firstResult['external_urls']['spotify']
        // display result to user
        console.log(`Song: ${songName}\nArtist(s): ${artists}\nAlbum: ${album}\n${prevUrl}`)
      }
    )
}

// movie-this function
const movieSearch = (movie = 'Mr. Nobody') => {
  console.log('Searching for your film...')
  request(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}`, (err, resp, body) => {
    // check for errors
    if (err) return console.log(err)
    // if successful
    if (resp.statusCode === 200) {      
      let film = JSON.parse(body);
      // if it found a film
      if (film.Response === 'True') {            
        // log out the appropriate values      
        console.log(`* Title: ${film.Title}`)
        console.log(`* Released: ${film.Year}`)
        console.log(`* IMDB Rating: ${film.Ratings[0]['Value']}`)
        console.log(`* Rotten Tomatoes Rating: ${film.Ratings[1]['Value']}`)
        console.log(`* Produced In: ${film.Country}`)
        console.log(`* Language(s): ${film.Language}`)
        console.log(`* Plot: ${film.Plot}`)
        console.log(`* Actors: ${film.Actors}`)
      }
      // inform user if it found no film
      else console.log(film.Error)
    }    
  })
}

// do-what-it-says function
const randomSearch = () => {
  // grab the contents of random.txt
  fs.readFile('random.txt', 'utf8', (err, data) => {
    // handle errors
    if (err) throw err;
    // parse the incoming JSON
    let options = JSON.parse(data);
    // pick a random option from the resulting array
    let option = options[Math.floor(Math.random() * options.length)]
    // format the method
    let method = option['method'].slice(0, option['method'].indexOf('-'));
    // run the appropriate function
    methods[method](option['input'])  
  })

  
  // // This is the way the homework wanted us to do it, but I changed random.txt to allow for a true random experience
  // fs.readFile('random.txt', 'utf8', (err, data) => {
  //   if (err) throw err;
  //   let parsed = data.split(',');
  //   let method = parsed[0].slice(0, parsed[0].indexOf('-'));
  //   methods[method](parsed[1])
  // })
}



// App methods
const methods = {
  concert: concertSearch,
  spotify: spotifySearch,
  movie: movieSearch,
  do: randomSearch
}




let curMethod = process.argv[2].slice(0, process.argv[2].indexOf('-'))
methods[curMethod](process.argv[3])