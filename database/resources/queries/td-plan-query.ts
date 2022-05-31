import { knexResolver } from "../../../backend/libs";
import { db } from "../../db";
import { tdPlanStatements, TdPlanStatements } from "../statements";

const tdPlanQuery = {
  selectAll: () =>
    knexResolver<TdPlanStatements.SelectAll.Result>(
      db.raw(tdPlanStatements.selectAll())
    ),
};

export { tdPlanQuery };
