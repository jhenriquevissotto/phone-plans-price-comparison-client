import { Request, Response } from "express";
import { tdPlanQuery } from "../../../../database/resources/queries";
import { SelectAllTdPlan } from "../../../../integration/database";

async function selectAllTdPlanCtrl(
  // @ts-ignore
  req: Request & SelectAllTdPlan.Req,
  res: Response
) {
  const { data, error, isError } = await tdPlanQuery.selectAll();

  const response: SelectAllTdPlan.Response = { data, error, isError };

  return res.json(response);
}

export { selectAllTdPlanCtrl };
