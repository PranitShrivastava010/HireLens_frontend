import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // from .env
  withCredentials: true, // allow refresh token cookie
});
