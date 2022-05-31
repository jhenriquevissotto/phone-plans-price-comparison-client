import { useDispatch } from "~/src/react/hooks/redux";
import { Store } from "~/src/redux/store";
import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useEffect } from "react";
import { useQueries } from "~/src/react/hooks";
import { isInt, isSlug } from "~/src/libs/validator";

export module TableForm {
  export module Constants {
    export type Fields = {
      selectFrom: null | string;
      selectTo: null | string;
      selectPlan: null | string;
      inputTime: null | string;
    };
  }

  export type State = {
    fields: Constants.Fields;
  };
  export module Actions {
    export module SetFields {
      export type Payload = Partial<Constants.Fields>;
    }
  }
}

export const tableForm = (() => {
  const group = "forms";
  const name = "tableForm";

  const initialState: TableForm.State = {
    fields: {
      selectFrom: "",
      selectTo: "",
      selectPlan: "",
      inputTime: "",
    },
  };

  const slice = createSlice({
    name,
    initialState,
    extraReducers(builder) {
      // @ts-ignore
      builder.addCase(HYDRATE, (state, { payload }) => ({
        ...state,
        ...payload[group][name],
      }));
    },
    reducers: {
      setFields(
        localState: TableForm.State,
        { payload }: { payload: TableForm.Actions.SetFields.Payload }
      ) {
        localState.fields = { ...localState.fields, ...payload };
      },
    },
  });

  const selectors = {
    getState: createDraftSafeSelector(
      [(storeState: Store.State) => storeState.forms.tableForm],
      (localState) => {
        return localState;
      }
    ),
  };

  function initEffects() {
    const { dispatch } = useDispatch();
    const { queries } = useQueries();

    useEffect(() => {
      if (queries.from && isInt(queries.from)) {
        dispatch(tableForm.actions.setFields({ selectFrom: queries.from }));
      }
      if (!queries.from) {
        dispatch(tableForm.actions.setFields({ selectFrom: "" }));
      }
    }, [queries.from]);

    useEffect(() => {
      if (queries.plan && isSlug(queries.plan)) {
        dispatch(tableForm.actions.setFields({ selectPlan: queries.plan }));
      }
      if (!queries.plan) {
        dispatch(tableForm.actions.setFields({ selectPlan: "" }));
      }
    }, [queries.plan]);

    useEffect(() => {
      if (queries.time && isInt(queries.time)) {
        dispatch(tableForm.actions.setFields({ inputTime: queries.time }));
      }
      if (!queries.time) {
        dispatch(tableForm.actions.setFields({ inputTime: "" }));
      }
    }, [queries.time]);

    useEffect(() => {
      if (queries.to && isInt(queries.to)) {
        dispatch(tableForm.actions.setFields({ selectTo: queries.to }));
      }
      if (!queries.to) {
        dispatch(tableForm.actions.setFields({ selectTo: "" }));
      }
    }, [queries.to]);
  }

  return { ...slice, selectors, initEffects };
})();
