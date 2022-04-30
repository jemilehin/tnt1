export const initialState = {
  token: null,
  user: {}
}

export const reducers = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, user: action.payload.user };
    case 'SIGNUP_FAILURE':
      return {...state};
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SIGNIN_FAILURE':
      return {...state};
    default:
      break;
  }
};
