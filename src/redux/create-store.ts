import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { toast } from "~/src/redux/stores/application";
import { table } from "~/src/redux/stores/components";

export function createStore() {
  return configureStore({
    reducer: {
      application: combineReducers({
        [toast.name]: toast.reducer,
      }),
      components: combineReducers({
        [table.name]: table.reducer,
      }),
    },
  });
}
