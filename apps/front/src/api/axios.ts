import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // for Vite
  withCredentials: true,                 // send cookies if needed
});

export default API;
