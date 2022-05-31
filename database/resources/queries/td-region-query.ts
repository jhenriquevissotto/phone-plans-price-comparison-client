import { knexResolver } from "../../../backend/libs";
import { db } from "../../db";
import { tdRegionStatements, TdRegionStatements } from "../statements";

const tdRegionQuery = {
  selectAll: () =>
    knexResolver<TdRegionStatements.SelectAll.Result>(
      db.raw(tdRegionStatements.selectAll())
    ),
};

export { tdRegionQuery };
