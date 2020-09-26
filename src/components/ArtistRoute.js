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

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

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
    console.log("artistData.currentArtist: ", currentArtist);
  }

  return (
    <>
      {status == "idle" ? (
        <ArtistPage>
          <ArtistImg src={currentArtist.images[0].url} />
          <ArtistName>{currentArtist.name}</ArtistName>
          <ArtistFollowers>
            <Followers>
              {nFormatter(currentArtist.followers.total, 0)}
            </Followers>{" "}
            followers
          </ArtistFollowers>
          <ArtistHeaderTag>Tags</ArtistHeaderTag>
          {currentArtist.genres.slice(0, 2).map((genre) => {
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

const ArtistFollowers = styled.div``;

const Followers = styled.span`
  font-weight: bold;
`;

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
  align-items: center;
`;
const ArtistImg = styled.img`
  height: 50%;
  width: 25%;
`;

export default ArtistRoute;
