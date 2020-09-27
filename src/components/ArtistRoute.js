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

import PlayButton from "./PlayButton";
import styled from "styled-components";
import NFormatter from "./NFormatter";

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
  if (artistData) {
    console.log("artistData: ", artistData);
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
              {NFormatter(currentArtist.followers.total, 0)}{" "}
              <FollowerLbl>Followers</FollowerLbl>
            </Followers>{" "}
          </ArtistFollowers>
          <ArtistTag>
            <ArtistHeaderTag>Tags</ArtistHeaderTag>
            <SimilarArtistGenres>
              {currentArtist.genres.slice(0, 2).map((genre) => {
                return <ArtistGenres>{genre}</ArtistGenres>;
              })}
            </SimilarArtistGenres>
          </ArtistTag>
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

const ArtistTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SimilarArtistGenres = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1%;
`;

const ArtistFollowers = styled.div`
  margin-top: 5%;
`;

const Followers = styled.span`
  color: #ff4fd8;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: lowercase;
  margin-top: 1%;
`;
const FollowerLbl = styled.span`
  color: white;
`;

const Spinner = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ArtistName = styled.div`
  color: white;
  margin-top: -15%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
`;

const ArtistHeaderTag = styled.div`
  color: white;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  text-transform: lowercase;
  margin-top: 5%;
`;

const ArtistGenres = styled.span`
  color: white;
  border: 1px solid white;
  flex: 1;
  text-align: center;
  background-color: #4b4b4b;
  padding: 2%;
  margin: 2%;
`;

const ArtistPage = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  align-items: center;
  background-color: black;
  width: 35%;
  margin: 0 auto;
`;
const ArtistImg = styled.img`
  height: 50%;
  border-radius: 50%;
  border: 1px solid white;
`;

export default ArtistRoute;
