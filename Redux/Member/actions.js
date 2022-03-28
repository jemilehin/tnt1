import {
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
// import api from "../../helpers/api";
const URL = "http://act.mainnetconnections.com/api/auth/";


export const SignUpRequest = async (
  formdata,
  callback,
  errorCallback
) => {
  await fetch(`${URL}register`, {
    method: 'post',
    body: formdata,
    headers: {
      Accept: "application/json",
      'Content-Type': 'multipart/form-data'
    },
  }).then(response => {
    if (response.status) {
    console.log(response.body)
    callback(response)
  } else {
    console.log('user not registered')
  }
  }).catch((err) => {
    errorCallback(err)
  })
  
};

export const SignInRequest = (email, token) => async (dispatch) => {
  await api
    .post("", { email, token })
    .then((response) => {
      if (response.status) {
        // dispacth action
        console.log(response.data);
      }
    })
    .catch((e) => {
      console.log("error response", e);
      // dispatch action
    });
};
