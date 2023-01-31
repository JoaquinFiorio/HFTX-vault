import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    process.env.NODE_ENV == "production"
      ? "https://hftx-backend.onrender.com/"
      : "http://localhost:3001/",
});

export default axiosApi;
