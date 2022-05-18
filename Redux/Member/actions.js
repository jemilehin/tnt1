import {
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT_SUCCESS,
  UPDATE_PROFILE
} from "./actionTypes";
import api from "../../helpers/api";
import { URL } from "../../helpers/api";
import { twilloBaseUrl } from "../../helpers/twilloApi/twillo";

const signUpSuccess = (token,user) => ({
  type: SIGNUP_SUCCESS, payload:{token: token, user: user }
})

const signInSuccess = (token,user) => ({
  type: SIGNIN_SUCCESS, payload:{token: token, user: user }
})

const updateProfile = (user) => {
  type: UPDATE_PROFILE, user
}

export const SignUpRequest = async (formdata, callback, errorCallback,dispatch) => {
  // console.log(formdata);
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${URL}register`, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((result) => {
      dispatch(signUpSuccess(result.access_token, result.user))
      callback(result)
    })
    .catch((error) => errorCallback(error));
};

export const SignInRequest = async (email, password, callback, errCallback, dispatch) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const credentials = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: credentials,
    redirect: "follow",
  };
  fetch(`${URL}login`, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((result) => {
      dispatch(signInSuccess(result.access_token, result.user))
      callback(result)
    })
    .catch((error) => errCallback(error.message));
};

export const memberProfileUpdate = async (
  data,
  id,
  callback,
  errorCallback,
) => {
  // console.log(data)
  await fetch(`${URL}update/${id}`,data)
  .then(res => {
    if(res.ok){
      return res.json()
    }else{
      throw new Error(res.json())
    }
  })
  .then(data => {
    console.log(data)
    callback(response)
  })
  .catch(error => errorCallback(error))
};

export const StartVerification = async (phoneNumber, callback, errCallback) => {
  const addHeaders = new Headers();
  addHeaders.append("Content-Type", "application/json");

  const data = {
    method: "POST",
    headers: addHeaders,
    body: JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    }),
    redirect: "follow",
  };
  await fetch(
    `${twilloBaseUrl}start-verify?to=${phoneNumber}&channel=sms`,
    data
  )
    .then((response) =>  response.json())
    .then(result => {
      if(result.success){
        callback(result)
      }else{
        throw new Error(`invalid mobile number ${phoneNumber}`)
      }
    })
    .catch(error => errCallback(error));
};

export const CheckVerification = (phoneNumber, code, callback) => {
  const addHeaders = new Headers();
  addHeaders.append("Content-Type", "application/json");

  const data = {
    method: "POST",
    headers: addHeaders,
    body: JSON.stringify({
      to: phoneNumber,
      code: code,
    }),
    redirect: "follow",
  };

  fetch(`${twilloBaseUrl}check-verify`, data)
    .then((response) => response.json())
    .then((result) => {
      callback(result);
    })
    .catch((error) => console.log("err", error));
};

export const sendMessage = (img,content, callback) => {
  var formdata = new FormData();
  formdata.append("slug", img);
  formdata.append("message", content);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${URL}userSendMessage`, requestOptions)
    .then((response) => {
      if(response.ok){
      return response.json()
    }else{
      throw new Error("Given data was invalid.")
    }})
    .then(result => callback(result))
    .catch(error => console.log("error", error));
};

export const signOutRequest = () => ({
  type: SIGNOUT_SUCCESS, payload: {user: null, token: null}
})
