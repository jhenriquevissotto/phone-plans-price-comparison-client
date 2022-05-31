import { knexResolver } from "../../../../backend/libs";
import { db } from "../../../../backend/database/db";
import {
  trPriceStatements,
  TrPriceStatements,
} from "../../../../backend/database/resources/statements";

const trPriceQuery = {
  selectAll: knexResolver<TrPriceStatements.SelectAll.Result[]>(
    db.raw(trPriceStatements.selectAll())
  ),
};

export { trPriceQuery };
