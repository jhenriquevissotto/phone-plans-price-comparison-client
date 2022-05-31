import axios from "axios";
import { env } from "~/environment/env";

export const nextAxiosApi = axios.create({
  baseURL: env.NEXT_API_BASE_URL,
});
