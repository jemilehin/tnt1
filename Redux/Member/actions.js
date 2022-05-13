import {
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT_SUCCESS
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

export const SignUpRequest = async (formdata, callback, errorCallback,dispatch) => {
  // console.log(formdata);
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: { "Content-Type": "multipart/form-data" },
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
  errorCallback
) => {
  await api
    .put(`update/${id}`, data)
    .then((response) => callback(response))
    .catch((e) => {
      errorCallback(e);
    });
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
  formdata.append("slug",fileInput.files[0], img);
  formdata.append("content", content);
  // console.log(title, slug, content);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${URL}userSendMessage`, requestOptions)
    .then((response) => response.status)
    .then((result) => callback(result))
    .catch((error) => console.log("error", error));
};

export const signOutRequest = () => ({
  type: SIGNOUT_SUCCESS, payload: {user: null, token: null}
})
