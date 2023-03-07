#!/usr/bin/node

// const request = require('request');
// const filmId = process.argv[2];
// const url = `https://swapi-api.hbtn.io/api/films/${filmId}`;

// request(url, async (err, response, body) => {
//   if (err) {
//     console.log(err);
//   }
//   for (const characterId of JSON.parse(body).characters) {
//     await new Promise((resolve, reject) => {
//       request(characterId, (err, response, body) => {
//         if (err) {
//           reject(err);
//         }
//         console.log(JSON.parse(body).name);
//         resolve();
//       });
//     });
//   }
// });


const axios = require('axios');

// Define the base URL of the Star Wars API
const baseUrl = 'https://swapi.dev/api';

// Define a function to retrieve the characters of a movie by its ID
async function getCharacters(movieId) {
  try {
    // Send a GET request to the API to retrieve the movie details
    const movieUrl = `${baseUrl}/films/${movieId}/`;
    const movieResponse = await axios.get(movieUrl);

    // Extract the list of characters from the movie details
    const characters = movieResponse.data.characters;

    // Send a GET request to retrieve the details of each character
    const characterNames = await Promise.all(characters.map(async (characterUrl) => {
      const characterResponse = await axios.get(characterUrl);
      return characterResponse.data.name;
    }));

    return characterNames;
  } catch (error) {
    console.error(`Error: Could not retrieve movie details. ${error.message}`);
    return [];
  }
}

// Check if a movie ID was provided as a command-line argument
const movieId = process.argv[2];
if (!movieId) {
  console.error('Usage: node star_wars_characters.js <movie_id>');
  process.exit(1);
}

// Retrieve the movie characters and print them
getCharacters(movieId)
  .then((characterNames) => {
    characterNames.forEach((name) => console.log(name));
  })
  .catch((error) => console.error(error.message));

