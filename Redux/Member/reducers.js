const initialState = {
  token: null,
  user: null
}

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, token: action.payload.token, user: action.payload.user };
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
    case 'SIGNOUT_SUCCESS':
      return {...state, token: action.payload.token, user: action.payload.user}
    case 'UPDATE_PROFILE':
      return {...state, user: action.user}
    default:
      return state
  }
};
