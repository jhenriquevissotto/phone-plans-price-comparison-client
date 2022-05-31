import { Request, Response } from "express";
import { trPriceQuery } from "../../../../database/resources/queries";
import { SelectAllTrPrice } from "../../../../integration/database";

async function selectAllTrPriceCtrl(
  // @ts-ignore
  req: Request & SelectAllTrPrice.Req,
  res: Response
) {
  const { data, error, isError } = await trPriceQuery.selectAll();

  const resoponse: SelectAllTrPrice.Response = { data, error, isError };

  return res.json(resoponse);
}

export { selectAllTrPriceCtrl };
