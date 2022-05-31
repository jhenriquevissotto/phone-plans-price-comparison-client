import { TdPlanModel } from "../../model";

export module TdPlanStatements {
  export module SelectAll {
    export type Params = void;
    export type Binds = void;
    export type Result = TdPlanModel[];
  }
}

const tdPlanStatements = {
  selectAll: () => `SELECT * FROM td_plan`,
};

export { tdPlanStatements };
