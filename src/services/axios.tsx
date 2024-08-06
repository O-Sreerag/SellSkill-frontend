import axios from 'axios'
//const BASE_URL =  process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://sellskill.hawkinvoice.online"
const BASE_URL = "https://sellskill.hawkinvoice.online";
console.log(BASE_URL);

export const api = axios.create({
  baseURL: BASE_URL,
});
export const adminApi = axios.create({
  baseURL: BASE_URL,
});

// Request & Response interceptor

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403 && error.response.data.message === 'User is blocked') {
      alert("Your account has been blocked. Please contact support.");
      window.location.href = '/blocked';
    }
    return Promise.reject(error);
  }
);

adminApi.interceptors.request.use(
  (config) => {
    console.log("sending axios request to backend")
    let adminToken = localStorage.getItem('adminToken')
    if(!adminToken) console.log("no admin Token is present")
    if (adminToken) config.headers['accesstoken'] = adminToken
    return config
  },
  (error) => {
    console.log(error, "error");

    return Promise.reject(error)
  }
)