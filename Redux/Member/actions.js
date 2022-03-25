import {
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
import api from "../../helpers/api";
import axios from "axios";

export const SignUpRequest = async (
  formdata,
  config,
  callback,
  errorCallback
) => {
  // console.log(formdata)
//   await api.post('register', formdata, config)
//     .then((response) => {
//       console.log(response);
//       callback(response.data);
//     })
//     .catch((response) => {
//       errorCallback(response);
//     });

axios.post("http://act.mainnetconnections.com/api/auth/register", formdata, config)
.then(res => {
    console.log(res.data)
}).catch(err => {
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
