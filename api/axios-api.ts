import Axios from "axios";
import { env } from "~/config/env";

export const axiosApi = Axios.create({
  baseURL: env.API_BASE_URL,
});
