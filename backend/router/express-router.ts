import { Router as createExpressRouter } from "express";
import { testCtrl } from "../../backend/controllers/test-ctrl";

const expressRouter = createExpressRouter();

expressRouter.use("*", testCtrl);

export { expressRouter };
