import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);
export const refreshToken = () => API.post("/refresh-token");
export const logout = () => API.post("/logout");
export const fetchUser = () => API.get("/user").then((res) => res.data);


export default API;
