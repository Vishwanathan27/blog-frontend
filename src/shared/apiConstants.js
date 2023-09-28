import axios from "axios";
const baseUrl = "http://34.247.214.210/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
