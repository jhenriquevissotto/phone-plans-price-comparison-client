import { knexResolver } from "../../../../backend/libs";
import { db } from "../../../../backend/database/db";
import {
  tdRegionStatements,
  TdRegionStatements,
} from "../../../../backend/database/resources/statements";

const tdRegionQuery = {
  selectAll: knexResolver<TdRegionStatements.SelectAll.Result[]>(
    db.raw(tdRegionStatements.selectAll())
  ),
};

export { tdRegionQuery };
