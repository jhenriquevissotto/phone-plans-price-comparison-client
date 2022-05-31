import { Router as createExpressRouter } from "express";
import { testCtrl } from "../../backend/controllers/test-ctrl";
import { test } from "../../integration/express/test";

const expressRouter = createExpressRouter();

expressRouter.use(test.endpoint, testCtrl);

export { expressRouter };
