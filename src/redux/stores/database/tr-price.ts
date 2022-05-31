import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Store } from "~/src/redux/store";
import { expressReduxApi } from "~/src/resources/redux/express-redux-api";
import { selectAllTrPrice, SelectAllTrPrice } from "~/integration/database";

export module TrPrice {
  export type State = SelectAllTrPrice.Response & {
    meta: {
      requestId: null | string;
      requestStatus: null | "fulfilled" | "pending" | "rejected";
    };
  };
}

export const trPrice = (() => {
  const group = "database";
  const name = "trPrice";

  const initialState: TrPrice.State = {
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
      selectAll: builder.query<SelectAllTrPrice.Response, void>({
        query: () => ({
          url: selectAllTrPrice.endpoint,
          method: selectAllTrPrice.method,
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
        api.endpoints.selectAll.matchPending,
        (state, { meta }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;
        }
      );
      builder.addMatcher(
        api.endpoints.selectAll.matchFulfilled,
        (state, { meta, payload }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;

          state.isError = payload.isError;
          state.error = payload.error;
          state.data = payload.data;
        }
      );
      builder.addMatcher(
        api.endpoints.selectAll.matchRejected,
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
      [(storeState: Store.State) => storeState.database.trPrice],
      (localState) => {
        return localState;
      }
    ),
  };

  function initEffects() {}

  return { api, ...slice, selectors, initEffects };
})();
