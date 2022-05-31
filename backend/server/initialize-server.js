const { env } = require("../../environment/env");

const { nextServer } = require("../../backend/server/next-server");
const { expressServer } = require("../../backend/server/express-server");

const { nextRouter } = require("../../backend/router/next-router");
const { expressRouter } = require("../../backend/router/express-router");

const cors = require("cors");
const bodyParser = require("body-parser");

function initializeServer() {
  nextServer.prepare().then(() => {
    // config
    expressServer.use(cors());
    expressServer.use(bodyParser.json());
    expressServer.use("/express/api", expressRouter);

    // next
    expressServer.all("*", (req, res) => nextRouter(req, res));

    // listen
    expressServer.listen(env.PORT, () => console.log(">> Server initialized"));
  });
}

module.exports = { initializeServer };
