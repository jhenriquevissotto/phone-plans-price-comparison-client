import axios from "axios";
import { env } from "~/src/global/env";

export const axiosApi = axios.create({
  baseURL: env.API_BASE_URL,
});
