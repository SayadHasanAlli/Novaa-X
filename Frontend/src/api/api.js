import axios from "axios";

const api = axios.create({
  baseURL: "https://novaa-x.onrender.com",
});

export default api;
