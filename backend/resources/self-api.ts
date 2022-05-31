import axios from "axios";
import { env } from "../../environment";

export const selfApi = axios.create({
  baseURL: env.EXPRESS_API_BASE_URL,
});
