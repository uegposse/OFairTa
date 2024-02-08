import axios from "axios";

export const api = axios.create({
  baseURL: "https://ofairta-backend.vercel.app",
});
