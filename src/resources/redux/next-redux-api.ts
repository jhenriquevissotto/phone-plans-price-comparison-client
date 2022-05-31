import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "~/environment/env";
import { test, Test } from "~/integration/next/test";
import { HYDRATE } from "next-redux-wrapper";

export const nextReduxApi = createApi({
  reducerPath: "nextReduxApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.NEXT_API_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  endpoints: (builder) => ({
    test: builder.query<Test.Res, void>({
      query: () => test.endpoint,
    }),
  }),
});
