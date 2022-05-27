import { configureStore } from "@reduxjs/toolkit";
import { application } from "./stores/application";

export const store = configureStore({
  reducer: { application: application.slice.reducer },
});
