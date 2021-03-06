# liri-node-app
A node.js app for discovering entertainment options.

## Overview
This app allows a user to choose from one of four search options to fulfill their entertainment needs.

The result of a given method is logged out to the console, and also stored locally in a log file.

## Setting up the app
### 1. Clone or download this repository

![Clone or Download Image](https://i.imgur.com/ZP8N719.png)

### 2. Install node if you dont have it

Instructions found at [npmjs.com](https://docs.npmjs.com/getting-started/installing-node)

### 3. Install required dependencies

In terminal (Mac) or bash (PC), navigate to the folder where you have this app. Then install dependencies:  
  `npm i`  
The following dependencies will be installed:
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
* [moment](http://momentjs.com/docs/#/manipulating/)
* [require](https://requirejs.org/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [inquirer](https://www.npmjs.com/package/inquirer)

### 4. Obtain Spotify API key
Navigate to the [Spotify Developer](https://developer.spotify.com/dashboard/login) page. Login, or if you don't already have a Spotify account, you can create one for free. Once there, head over to the [dashboard](https://developer.spotify.com/dashboard/applications).

![Spotify Developer Dashboard Image](https://i.imgur.com/H81Ehgw.png)

Create a new app, calling it whatever you'd like. Then, from the page for the app, copy your Client ID and Client Secret.

![API Keys Image](https://i.imgur.com/DV6dMFI.png)

You will need these in the next step.

### 5. Create a .env file
Create a new file, called '.env' in the directory where the app is installed. Paste the following text in, substituting your own Spotify Client and Secret API keys.

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
This file is used by the app to interact with Spotify.

## Using the app
There are two interfaces for the app, both leading to the same functionality. For a video demostration, click [here](https://drive.google.com/file/d/1WrMyf5hoYuFhEjYSWi-Y5ST3xQbY9yny/view)

### Traditional search

From the command line, navigate to the directory where the app is installed. To use the app, enter the following:
```
node liri.js <method> <"input">
```
The different methods available are detailed below. Please note, the input must be in quotes ("").

Method | Description
------ | ----------
`concert-this "artist name"` | Returns information on upcoming concerts for the given artist from [Bandsintown](https://www.bandsintown.com/).
`spotify-this-song "song name"` | Returns information and a [Spotify](https://www.spotify.com) link for the given song.
`movie-this "movie name"` | Returns information for the given movie from the [OMDB](https://www.omdbapi.com).
`do-whatever` | Returns a random result from above.

### NEW! Inquirer-based input

From the command line, navigate to the directory where the app is installed. To use the app, enter the following:
```
node liri.js
```
Follow the prompts to perform your search.

## Future development

- [x] Integrate [inquirer](https://www.npmjs.com/package/inquirer) to streamline user experience
- [ ] Add additional query options for existing methods
- [ ] Add additional methods, e.g. Eventbrite, etc.

