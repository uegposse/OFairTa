import axios from "axios";

export const api = axios.create({
  baseURL: "https://ofairta-backend.vercel.app",
  timeout: 5000,
  timeoutErrorMessage: "Parece que a conexão a internet está lenta!",
});
