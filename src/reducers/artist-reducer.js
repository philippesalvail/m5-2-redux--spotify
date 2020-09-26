const initialState = {
  currentArtist: null,
  status: "loading",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_DATA": {
      return {
        ...state,
        status: "idle",
        currentArtist: {
          profile: action.data,
        },
      };
    }
    case "RECEIVE_ARTIST_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
