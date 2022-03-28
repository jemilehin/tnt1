import {
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
import api from "../../helpers/api";

export const SignUpRequest =async (formdata, callback, errorCallback) => {
  // console.log(formdata);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("http://act.mainnetconnections.com/api/auth/register", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export const SignInRequest = (email,password, callback) => async (dispatch) => {
  await api.post('login', {email,password})
    .then((response) => {
      if (response.status) {
        // dispacth action
        console.log(response.data);
        callback(response)
      }
    })
    .catch((e) => {
      console.log("error response", e);
      // dispatch action
    });
};
