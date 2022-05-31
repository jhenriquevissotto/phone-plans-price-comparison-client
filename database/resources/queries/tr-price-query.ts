import { knexResolver } from "../../../backend/libs";
import { db } from "../../db";
import { trPriceStatements, TrPriceStatements } from "../statements";

const trPriceQuery = {
  selectAll: () =>
    knexResolver<TrPriceStatements.SelectAll.Result>(
      db.raw(trPriceStatements.selectAll())
    ),
};

export { trPriceQuery };
