import axios from "axios";
// const API_URL = process.env.API_URL
// const API_URL = "https://59ec-2804-1530-104-a0c2-7dc5-2211-b3f-80cd.sa.ngrok.io"
const API_URL = "http://localhost:3333";

const api = axios.create({
  baseURL: API_URL,
});

// class ApiPix {
//     private hasToken = false;

//     constructor(){

//     }
//     function authentication() {

//     }
// }

const authentication = () => {};
