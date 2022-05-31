import { Toast } from "~/src/redux/stores/application/toast";
import { Table } from "~/src/redux/stores/components/table";
import { createStore } from "~/src/redux/create-store";

export const store = createStore();

export module Store {
  export type State = {
    application: {
      toast: Toast.State;
    };
    components: {
      table: Table.State;
    };
  };
  export type Dispatch = typeof store.dispatch;
}
