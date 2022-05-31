import { TdRegionModel } from "../../../../backend/database/model";

export module TdRegionStatements {
  export module SelectAll {
    export type Params = void;
    export type Binds = void;
    export type Result = TdRegionModel[];
  }
}

const tdRegionStatements = {
  selectAll: () => `SELECT * FROM td_region`,
};

export { tdRegionStatements };
