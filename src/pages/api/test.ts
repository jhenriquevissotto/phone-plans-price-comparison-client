import { NextApiRequest, NextApiResponse } from "next";
import { Test } from "~/integration/next/test";

// @ts-ignore
export default function (req: NextApiRequest, res: NextApiResponse) {
  const response = { test: true } as Test.Res;
  return res.send(response);
}
