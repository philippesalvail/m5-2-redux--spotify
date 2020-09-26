const initialState = {
  token: null,
  status: "idle",
};

export default function authReducer(state = initialState, action) {
  console.log("action; ", action);
  switch (action.type) {
    case "REQUEST_ACCESS_TOKEN": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ACCESS_TOKEN": {
      return {
        token: action.token.access_token,
        status: "idle",
      };
    }
    case "RECEIVE_ACCESS_TOKEN_ERROR": {
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
