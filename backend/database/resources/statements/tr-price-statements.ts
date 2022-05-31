import { TrPriceModel } from "../../../../backend/database/model";

export module TrPriceStatements {
  export module SelectAll {
    export type Params = void;
    export type Binds = void;
    export type Result = TrPriceModel[];
  }
}

const trPriceStatements = {
  selectAll: () => `SELECT * FROM tr_price`,
};

export { trPriceStatements };
