import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import ArtistRoute from "../ArtistRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

export const DEFAULT_ARTIST_ID = "2CIMQHirSU0MQqyYHq0eOx";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const artist = useSelector((state) => state.artists.currentArtist);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        console.log("json: ", json.json);
        dispatch(receiveAccessToken(json.json));
      })
      .catch((err) => {
        dispatch(receiveAccessTokenError(err));
      });
  }, []);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
