import { Store } from "~/src/redux/store";
import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { createID } from "~/src/libs/create-id";

export module Table {
  export module Constants {
    export type Dataset = {
      rowID: string;
      from: number;
      to: number;
      time: number;
      plan_id: string;
      plan_slug_en: string;
      plan_slug_pt: string;
      plan_name_en: string;
      plan_name_pt: string;
      withPlan: number;
      withoutPlan: number;
    };
  }

  export type State = {
    dataset: Table.Constants.Dataset[];
  };
  export module Actions {
    export module insertRow {
      export type Payload = Table.Constants.Dataset;
    }
    export module deleteRow {
      export type Payload = Pick<Table.Constants.Dataset, "rowID">;
    }
  }
}

export const table = (() => {
  const group = "components";
  const name = "table";

  const initialState: Table.State = {
    dataset: [
      {
        rowID: createID(),
        from: 11,
        to: 16,
        time: 20,
        plan_id: "talk-more-30",
        plan_slug_en: "talk-more-30",
        plan_slug_pt: "fale-mais-30",
        plan_name_en: "Talk More 30",
        plan_name_pt: "Fale Mais 30",
        withPlan: 0.0,
        withoutPlan: 38.0,
      },
      {
        rowID: createID(),
        from: 11,
        to: 17,
        time: 80,
        plan_id: "talk-more-60",
        plan_slug_en: "talk-more-60",
        plan_slug_pt: "fale-mais-60",
        plan_name_en: "Talk More 60",
        plan_name_pt: "Fale Mais 60",
        withPlan: 37.4,
        withoutPlan: 136.0,
      },
      {
        rowID: createID(),
        from: 18,
        to: 11,
        time: 200,
        plan_id: "talk-more-120",
        plan_slug_en: "talk-more-120",
        plan_slug_pt: "fale-mais-120",
        plan_name_en: "Talk More 120",
        plan_name_pt: "Fale Mais 120",
        withPlan: 167.2,
        withoutPlan: 380.0,
      },
      {
        rowID: createID(),
        from: 18,
        to: 17,
        time: 100,
        plan_id: "talk-more-30",
        plan_slug_en: "talk-more-30",
        plan_slug_pt: "fale-mais-30",
        plan_name_en: "Talk More 30",
        plan_name_pt: "Fale Mais 30",
        withPlan: null,
        withoutPlan: null,
      },
    ],
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
      deleteRow(
        localState: Table.State,
        { payload }: { payload: Table.Actions.deleteRow.Payload }
      ) {
        localState.dataset = localState.dataset.filter(
          (dataset) => dataset.rowID !== payload.rowID
        );
      },
      insertRow(
        localState: Table.State,
        { payload }: { payload: Table.Actions.insertRow.Payload }
      ) {
        localState.dataset.push({
          rowID: payload.rowID,
          from: payload.from,
          to: payload.to,
          time: payload.time,
          plan_id: payload.plan_id,
          plan_slug_en: payload.plan_slug_en,
          plan_slug_pt: payload.plan_slug_pt,
          plan_name_en: payload.plan_name_en,
          plan_name_pt: payload.plan_name_pt,
          withPlan: payload.withPlan,
          withoutPlan: payload.withoutPlan,
        });
      },
    },
  });

  const selectors = {
    getState: createDraftSafeSelector(
      [(storeState: Store.State) => storeState.components.table],
      (localState) => {
        return localState;
      }
    ),
  };

  function initEffects() {}

  return { ...slice, selectors, initEffects };
})();
