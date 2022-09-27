import axios from "axios";
// const API_URL = process.env.API_URL
const API_URL = "https://f5e4-2804-1530-104-a0c2-6d93-685a-c433-c5e8.sa.ngrok.io"
// const API_URL = "http://localhost:3333"

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(data=>{
  // console.log(data);
  return data;  
});
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  const { response } = error
  const { data, 'status':code } = response
  if(code === 422){
    const { erros } = data
  }
  // console.log("ocorreu um erro")
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(data.erros);
});

export default api;
