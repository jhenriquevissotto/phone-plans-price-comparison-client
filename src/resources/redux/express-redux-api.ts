import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { env } from "~/environment/env";
import { test, Test } from "~/integration/express/test";

export const expressReduxApi = createApi({
  reducerPath: "expressReduxApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.EXPRESS_API_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  endpoints: (builder) => ({
    test: builder.query<Test.Response, void>({
      query: () => test.endpoint,
    }),
  }),
});
