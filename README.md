# liri-node-app
A node.js app for discovering entertainment options.

## Overview
This app allows a user to choose from one of four search options to fulfill their entertainment needs.

Method | Description
------ | ----------
`concert-this <artist name>` | Returns information on upcoming concerts for the given artist from [Bandsintown](https://www.bandsintown.com/).
`spotify-this-song <song name>` | Returns information and a [Spotify](https://www.spotify.com) link for the given song.
`movie-this <movie name>` | Returns information for the given movie from the [OMDB](https://www.omdbapi.com).
`do-whatever` | Returns a random result from above.

The result of a given method is logged out to the console, and also stored locally in a log file.

## Setting up the app
1. Clone or download this repository
![Clone or Download Image](https://imgur.com/ZP8N719)

