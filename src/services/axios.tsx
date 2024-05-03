// import axios from 'axios'
// //const BASE_URL =  process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://sellskill.online"
// const BASE_URL = "https://sellskill.online";
// console.log(BASE_URL);

// export const api = axios.create({
//   baseURL: BASE_URL,
// });

// api.interceptors.request.use(
//   (config) => {
//     let token = localStorage.getItem('user')
//     if (token) config.headers['accessToken'] = token
//     return config
//   },
//   (error) => {
//     console.log(error, "errorr");

//     return Promise.reject(error)
//   }
// )