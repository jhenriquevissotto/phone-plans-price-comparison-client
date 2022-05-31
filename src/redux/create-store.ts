import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { expressReduxApi, nextReduxApi } from "~/src/resources";
import { toast } from "~/src/redux/stores/application";
import { table } from "~/src/redux/stores/components";
import { HYDRATE } from "next-redux-wrapper";

export function createStore() {
  const reducer = ((state, action) => {
    const hydratedState = { ...state, ...action?.payload };

    const initialState = combineReducers({
      [expressReduxApi.reducerPath]: expressReduxApi.reducer,
      [nextReduxApi.reducerPath]: nextReduxApi.reducer,
      application: combineReducers({
        [toast.name]: toast.reducer,
      }),
      components: combineReducers({
        [table.name]: table.reducer,
      }),
    });

    if (action?.type === HYDRATE) return hydratedState;
    else return initialState;
  })();

  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat([
        expressReduxApi.middleware,
        nextReduxApi.middleware,
      ]);
    },
  });
}
