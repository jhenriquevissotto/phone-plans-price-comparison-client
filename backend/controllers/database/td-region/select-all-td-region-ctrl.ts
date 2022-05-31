import { Request, Response } from "express";
import { SelectAllTdRegion } from "../../../../integration/database";
import { tdRegionQuery } from "../../../../database/resources/queries";

async function selectAllTdRegionCtrl(
  // @ts-ignore
  req: Request & SelectAllTdRegion.Req,
  res: Response
) {
  const { data, error, isError } = await tdRegionQuery.selectAll();

  const response: SelectAllTdRegion.Response = { data, error, isError };

  return res.json(response);
}

export { selectAllTdRegionCtrl };
