import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
