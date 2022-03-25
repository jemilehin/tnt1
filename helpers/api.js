import axios from "axios";

const URL = "http://act.mainnetconnections.com/api/auth/";
// const URL = "http://172.16.1.121:8000/api"

const instance = axios.create({
  baseURL: URL,
});

// instance.interceptors.request.use((config) => {

//   const { token } = store.getState().user;
//   config.headers.Authorization = token ? `Bearer ${token}` : null;
//   return config;
// });

export default instance;
