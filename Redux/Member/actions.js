import {
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
import api from "../../helpers/api";
import { URL } from "../../helpers/api";
import { twilloBaseUrl } from "../../helpers/twilloApi/twillo";

export const SignUpRequest = async (formdata, callback, errorCallback) => {
  // console.log(formdata);
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: { "Content-Type": "multipart/form-data" },
  };

  fetch(`${URL}register`, requestOptions)
    .then((response) => response.text())
    .then((result) => callback(JSON.parse(result)))
    .catch((error) => errorCallback(error));
};

export const SignInRequest = async (email, password, callback, errCallback) => {
  // console.log({ email, password });
  // await api
  //   .post("login")
  //   .then((response) => {
  //     if (response.status) {
  //       console.log(response.data);
  //       callback(response.data);
  //     }
  //   })
  //   .catch((e) => {
  //     errCallback(e);
  //   });
  const myHeaders = new Headers();
  const credentials = JSON.stringify({
    "email": email,
    "password": password
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: credentials,
    redirect: 'follow'
  };
  fetch(`${URL}login`, requestOptions)
    .then(response => response.text())
    .then(result => callback(JSON.parse(result)))
    .catch(error => errCallback(error));
};

export const memberProfileUpdate = async (
  data,
  id,
  callback,
  errorCallback
) => {
  await api.put(`update/${id}`, data)
    .then(response => callback(response))
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
    .then((response) => response.text())
    .then((result) => callback(JSON.parse(result)))
    .catch((error) => errCallback(error));
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
    .then((response) => response.text())
    .then((result) => {
      callback(JSON.parse(result));
    })
    .catch((error) => console.log("err", error));
};

export const sendMessage = (title,slug,content,callback) => {
  var formdata = new FormData();
  formdata.append("title", title);
  formdata.append("slug", slug);
  formdata.append("content", content);
  console.log(title,slug,content)

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `${URL}sendMessage`,
    requestOptions
  )
    .then((response) => response.status)
    .then((result) => callback(result))
    .catch((error) => console.log("error", error));
};
