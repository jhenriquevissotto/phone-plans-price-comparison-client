import { knexResolver } from "../../../../backend/libs";
import { db } from "../../../../backend/database/db";
import {
  tdPlanStatements,
  TdPlanStatements,
} from "../../../../backend/database/resources/statements";

const tdPlanQuery = {
  selectAll: knexResolver<TdPlanStatements.SelectAll.Result[]>(
    db.raw(tdPlanStatements.selectAll())
  ),
};

export { tdPlanQuery };
