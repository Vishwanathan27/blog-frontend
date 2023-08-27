import axios from "axios";
const baseUrl = "http://54.194.24.88/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
