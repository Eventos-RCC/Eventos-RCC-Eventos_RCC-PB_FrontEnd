import axios from "axios";

// axios.defaults.baseURL =
//   import.meta.env.API_BASE_URL || "http://localhost:8001/api";

// const api = axios.create({
//   baseURL: import.meta.env.API_BASE_URL || "http://localhost:8001/api",
// });

const api = axios.create({
  baseURL: "/api",
});

export default api;
