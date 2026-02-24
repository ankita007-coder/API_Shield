import axios from "axios";

const api = axios.create({
  baseURL: "http://backend1:3000",
});

export default api;