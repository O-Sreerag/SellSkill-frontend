import axios from 'axios'
//const BASE_URL =  process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://sellskill.online"
const BASE_URL = "http://sellskill.online";
console.log(BASE_URL);

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    console.log("sending axios request to backend")
    // const token: string | null = localStorage.getItem("token") || null;
    let token = localStorage.getItem('token')
    if (token) config.headers['accesstoken'] = token
    return config
  },
  (error) => {
    console.log(error, "error");

    return Promise.reject(error)
  }
)