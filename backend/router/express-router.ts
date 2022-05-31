// framework
import { Router as createExpressRouter } from "express";

// controllers
import { testCtrl } from "../../backend/controllers/test-ctrl";
import {
  selectAllTdPlanCtrl,
  selectAllTdRegionCtrl,
  selectAllTrPriceCtrl,
} from "../../backend/controllers/database";

// integration types
import { test } from "../../integration/express/test";
import {
  selectAllTdPlan,
  selectAllTdRegion,
  selectAllTrPrice,
} from "../../integration/database";

const expressRouter = createExpressRouter();

// test
expressRouter.use(test.endpoint, testCtrl);

// database
expressRouter.use(selectAllTdPlan.endpoint, selectAllTdPlanCtrl);
expressRouter.use(selectAllTdRegion.endpoint, selectAllTdRegionCtrl);
expressRouter.use(selectAllTrPrice.endpoint, selectAllTrPriceCtrl);

export { expressRouter };
