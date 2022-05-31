import { Request, Response } from "express";
import { Test } from "~/integration/express/test";

// @ts-ignore
function tdPlanCtrl(req: Request, res: Response) {
  const response = { test: true } as Test.Res;
  return res.send(response);
}

export { tdPlanCtrl };
