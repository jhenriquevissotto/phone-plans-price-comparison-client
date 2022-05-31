const { Router: createExpressRouter } = require("express");
const { testCtrl } = require("../../backend/controllers/test-ctrl");

const expressRouter = createExpressRouter();

expressRouter.use("*", testCtrl);

module.exports = { expressRouter };
