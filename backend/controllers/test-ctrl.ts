import { Request, Response } from "express";
import { Test } from "~/integration/express/test";

// @ts-ignore
function testCtrl(req: Request, res: Response) {
  const response = { test: true } as Test.Response;
  return res.send(response);
}

export { testCtrl };
