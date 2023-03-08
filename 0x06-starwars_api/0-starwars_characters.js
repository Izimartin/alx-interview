#!/usr/bin/node

// const request = require("request");
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

const request = require("request");

const options = {
  url: "https://swapi-api.hbtn.io/api/films/${filmId}" + process.argv[2],
  headers: {
    "User-Agent": "request",
  },
};

request(options, function (error, response, body) {
  if (error) {
    console.error("error:", error);
    return;
  }
  const characters = JSON.parse(body).characters;
  for (const characterUrl of characters) {
    request(
      { url: characterUrl, headers: { "User-Agent": "request" } },
      function (error, response, body) {
        if (error) {
          console.error("error:", error);
          return;
        }
        console.log(JSON.parse(body).name);
      }
    );
  }
});
