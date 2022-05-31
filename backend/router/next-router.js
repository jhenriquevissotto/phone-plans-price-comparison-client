const { nextServer } = require("../../backend/server/next-server");

const nextRouter = nextServer.getRequestHandler();

module.exports = { nextRouter };
