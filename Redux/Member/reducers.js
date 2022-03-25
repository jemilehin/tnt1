const reducers = (state = {}, action) => {
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
