const { nodeEnv } = require("../../environment/node-env");
const createNextServer = require("next");

const nextServer = createNextServer({ dev: nodeEnv.dev });

module.exports = { nextServer };
