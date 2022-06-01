import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Store } from "~/src/redux/store";
import { expressReduxApi } from "~/src/resources/redux/express-redux-api";
import { selectAllTdPlan, SelectAllTdPlan } from "~/integration/database";

export module TdPlan {
  export type State = SelectAllTdPlan.Response & {
    meta: {
      requestId: null | string;
      requestStatus: null | "fulfilled" | "pending" | "rejected";
    };
  };
}

export const tdPlan = (() => {
  const group = "database";
  const name = "tdPlan";

  const initialState: TdPlan.State = {
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
      selectAllTdPlan: builder.query<SelectAllTdPlan.Response, void>({
        query: () => ({
          url: selectAllTdPlan.endpoint,
          method: selectAllTdPlan.method,
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
        api.endpoints.selectAllTdPlan.matchPending,
        (state, { meta }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;
        }
      );
      builder.addMatcher(
        api.endpoints.selectAllTdPlan.matchFulfilled,
        (state, { meta, payload }) => {
          state.meta.requestId = meta.requestId;
          state.meta.requestStatus = meta.requestStatus;

          state.isError = payload.isError;
          state.error = payload.error;
          state.data = payload.data;
        }
      );
      builder.addMatcher(
        api.endpoints.selectAllTdPlan.matchRejected,
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
      [(storeState: Store.State) => storeState.database.tdPlan],
      (localState) => {
        return localState;
      }
    ),
    getTdPlanRowBySlug: (slug: string) =>
      createDraftSafeSelector(
        [(storeState: Store.State) => storeState.database.tdPlan],
        (localState) => {
          return localState?.data?.find(
            (f) => f?.slug_en == slug || f?.slug_pt == slug
          );
        }
      ),
  };

  function initEffects() {}

  return { api, ...slice, selectors, initEffects };
})();
