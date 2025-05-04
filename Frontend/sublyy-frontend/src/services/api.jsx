import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
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

// Auth endpoints
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const refreshToken = () => API.post("/auth/refresh-token");
export const logout = () => API.post("/auth/logout");
export const fetchUser = () => API.get("/auth/user").then((res) => res.data);

// Subscription endpoints - updated to use /api/subscriptions instead of /api/auth/subscriptions
export const addSubscription = async (data) => {
  try {
    const res = await API.post("/subscriptions", data);
    return res.data;
  } catch (err) {
    console.error("Add subscription error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to add subscription");
  }
};

export const getSubscriptions = async () => {
  try {
    const res = await API.get("/subscriptions");
    console.log("API response data:", res.data); // Add logging
    return res.data;
  } catch (err) {
    console.error("Get subscriptions error:", err.response?.data || err.message);
    return { subscriptions: [] };
  }
};

export const getSubscriptionAnalytics = async () => {
  try {
    const res = await API.get("/subscriptions/analytics");
    console.log("Analytics data:", res.data); // Add logging
    return res.data;
  } catch (err) {
    console.error("Get analytics error:", err.response?.data || err.message);
    return { total: 0, categoryDistribution: [] };
  }
};

// Add this function to get subscription count
export const getSubscriptionCount = async () => {
  try {
    const res = await API.get("/subscriptions");
    return res.data.subscriptions?.length || 0;
  } catch (err) {
    console.error("Get subscription count error:", err.response?.data || err.message);
    return 0;
  }
};

// User settings endpoints
export const getUserSettings = async () => {
  const res = await API.get("/user/settings");
  return res.data;
};

export const updateUserSettings = async (settings) => {
  const res = await API.put("/user/settings", settings);
  return res.data;
};

export default API;
