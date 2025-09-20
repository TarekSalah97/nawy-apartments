import axios from "axios";
import { LocalStorageKeys } from "../helpers/LocalStorageKeys";

const client = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
