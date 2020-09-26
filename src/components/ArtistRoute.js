import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { fetchArtistProfile } from "../helpers/api-helpers";
import {
  receiveArtistData,
  requestArtistData,
  receiveArtistDataError,
} from "../actions";

import styled from "styled-components";

const ArtistRoute = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const artistData = useSelector((state) => state.artists);
  const artistId = id;

  const { currentArtist, status } = artistData;

  if (accessToken) {
    console.log("accessToken: ", accessToken);
  }

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistData());
    fetchArtistProfile(accessToken, artistId)
      .then((response) => dispatch(receiveArtistData(response)))
      .catch(receiveArtistDataError());
  }, [accessToken]);

  if (currentArtist) {
    console.log("artistData.currentArtist: ", currentArtist.profile);
  }

  return (
    <>
      {status == "idle" ? (
        <ArtistPage>
          <ArtistImg src={currentArtist.profile.images[0].url} />
          <ArtistName>{currentArtist.profile.name}</ArtistName>
          <ArtistHeaderTag>Tags</ArtistHeaderTag>
          {currentArtist.profile.genres.slice(0, 2).map((genre) => {
            return <ArtistGenres>{genre}</ArtistGenres>;
          })}
        </ArtistPage>
      ) : (
        <Spinner
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={4000}
        />
      )}
    </>
  );
};

const Spinner = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ArtistName = styled.h1``;

const ArtistHeaderTag = styled.h2``;

const ArtistGenres = styled.div``;

const ArtistPage = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;
const ArtistImg = styled.img`
  height: 50%;
  width: 25%;
`;

export default ArtistRoute;
