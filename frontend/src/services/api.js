
import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api"
    : "https://backend-4bx3.onrender.com/api";
const API = axios.create({
  baseURL: API_URL
});

export default API;