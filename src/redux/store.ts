import { TdPlan, TdRegion, TrPrice } from "~/src/redux/stores/database";
import { Toast } from "~/src/redux/stores/application";
import { Table } from "~/src/redux/stores/components";
import { createStore } from "~/src/redux/create-store";

export const store = createStore();

export module Store {
  export type State = {
    database: {
      tdPlan: TdPlan.State;
      tdRegion: TdRegion.State;
      trPrice: TrPrice.State;
    };
    application: {
      toast: Toast.State;
    };
    components: {
      table: Table.State;
    };
  };
  export type Dispatch = typeof store.dispatch;
}
