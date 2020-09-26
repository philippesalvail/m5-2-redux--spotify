const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");

const app = new express();
const port = 5678;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/spotify_access_token", (req, res, next) => {
  const DEFAULT_ARTIST_ID = "2CIMQHirSU0MQqyYHq0eOx";
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );
  const requestOptions = {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => response.json())
    .then((json) => res.status(200).send({ json }))
    .catch((error) => {
      console.error("There was an error!", error);
    });

  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.

  // TODO: use authString in a request to Spotify!
  // res.send({ res: res });
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
