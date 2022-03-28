import { combineReducers } from "redux";
const initialState = {
  token: null,
  user: {}
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, user: action.payload };
    case SIGNUP_FAILURE:
      return {};
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SIGNIN_FAILURE:
      return {};
    default:
      break;
  }
};

export default combineReducers({
  token: reducers
})
