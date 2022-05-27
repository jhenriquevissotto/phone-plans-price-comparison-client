import { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AvailableLocales } from "~/locales/available-locales";

export module Application {
  export type InitialState = {
    lang: AvailableLocales;
  };
  export module Actions {
    export module SetLang {
      export type Payload = {
        lang: AvailableLocales;
      };
    }
  }
}

export module application {
  export const name = "application";

  export const initialState: Application.InitialState = {
    lang: "en",
  };

  export const slice = createSlice({
    name,
    initialState,
    reducers: {
      setLang: (
        state,
        { payload }: { payload: Application.Actions.SetLang.Payload }
      ) => {
        state.lang = payload.lang;
      },
    },
  });

  export function initializeEffects() {
    useEffect(() => {}, []);
  }
}
