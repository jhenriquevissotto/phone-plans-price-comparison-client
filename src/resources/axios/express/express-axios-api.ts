import axios from "axios";
import { env } from "~/environment/env";

export const expressAxiosApi = axios.create({
  baseURL: env.EXPRESS_API_BASE_URL,
});
