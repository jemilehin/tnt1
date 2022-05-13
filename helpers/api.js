import axios from "axios";

// export const URL = "http://act.mainnetconnections.com/api/auth/";
export const URL = "http://actmovement.org/api/auth/"

export const instance = axios.create({
  baseURL: URL,
});

// instance.interceptors.request.use((config) => {

//   const { token } = store.getState().user;
//   config.headers.Authorization = token ? `Bearer ${token}` : null;
//   return config;
// });

// export default instance;
