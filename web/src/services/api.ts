import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

// const navigate = useNavigate();
// useAuth();
const token = localStorage.getItem('@PermissionYT:token');

const api = axios.create({
  baseURL: API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: '',
  // },
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use((data) => {
  console.log(data);
  return data;
});
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const { response } = error;
    const { data, status: code } = response;
    if (code === 422) {
      const { erros } = data;
    }
    if (code === 401) {
      // const navigate = useNavigate();
      // navigate('/signIn', { replace: true });
      // < Navigate { to: '/signIn' }/>
      // console.log('ola ');
      // navigate('/signIn');
      // const { erros } = data;
    }
    // console.log("ocorreu um erro")
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(data.erros);
  }
);

export default api;
