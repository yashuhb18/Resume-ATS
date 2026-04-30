import axios from "axios";

const API = axios.create({
  baseURL: "http://10.59.33.215:8001",
});

export default API;