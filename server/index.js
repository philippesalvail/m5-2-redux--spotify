require("dotenv").config();
require("@babel/register");

if (
  process.env.SPOTIFY_CLIENT_ID !== "80629fd96a8f49c2a67390b441624038" ||
  process.env.SPOTIFY_SECRET !== "905fe567ce2b4239a8e0915720693f74"
) {
  throw new Error(
    "You need to copy over your Spotify client key and secret! See the workshop README for more information."
  );
}

require("./server.js");
