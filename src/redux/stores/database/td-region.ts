import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Store } from "~/src/redux/store";
import { expressReduxApi } from "~/src/resources/redux/express-redux-api";
import { selectAllTdRegion, SelectAllTdRegion } from "~/integration/database";

export module TdRegion {
  export type State = SelectAllTdRegion.Response & {
    meta: {
      requestId: null | string;
      requestStatus: null | "fulfilled" | "pending" | "rejected";
    };
  };
}

export const tdRegion = (() => {
  const group = "database";
  const name = "tdRegion";

  const initialState: TdRegion.State = {
    meta: {
      requestId: null,
      requestStatus: null,
    },
    isError: null,
    error: null,
    data: null,
  };

  const api = expressReduxApi.injectEndpoints({
    endpoints: (builder) => ({
      selectAllTdRegion: builder.query<SelectAllTdRegion.Response, void>({
        query: () => ({
          url: selectAllTdRegion.endpoint,
          method: selectAllTdRegion.method,
        }),
      }),
    }),
  });

  const slice = createSlice({
    name,
    initialState,
    extraReducers(builder) {
      // @ts-ignore
      builder.addCase(HYDRATE, (state, { payload }) => ({
        ...state,
        ...payload[group][name],
      }));

      builder.addMatcher(
        api.endpoints.selectAllTdRegion.matchPending,
        (state, { meta }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;
        }
      );
      builder.addMatcher(
        api.endpoints.selectAllTdRegion.matchFulfilled,
        (state, { meta, payload }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;

          state.isError = payload.isError;
          state.error = payload.error;
          state.data = payload.data;
        }
      );
      builder.addMatcher(
        api.endpoints.selectAllTdRegion.matchRejected,
        (state, { meta }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;
        }
      );
    },
    reducers: {},
  });

  const selectors = {
    getState: createDraftSafeSelector(
      [(storeState: Store.State) => storeState.database.tdRegion],
      (localState) => {
        return localState;
      }
    ),
  };

  function initEffects() {}

  return { api, ...slice, selectors, initEffects };
})();
