import { Request, Response } from "express";

// @ts-ignore
function testCtrl(req: Request, res: Response) {
  return res.send({ test: "6666" });
}

export { testCtrl };
