import { env } from "../../environment/env";

import { nextServer } from "../../backend/server/next-server";
import { expressServer } from "../../backend/server/express-server";

import { nextRouter } from "../../backend/router/next-router";
import { expressRouter } from "../../backend/router/express-router";

// import cors from "cors";
import { static as expressStatic, json as expressJson } from "express";

function initializeServer() {
  nextServer.prepare().then(() => {
    // config
    // expressServer.use(cors());
    expressServer.use(expressJson());
    expressServer.use(expressStatic("public"));
    expressServer.use("/express/api", expressRouter);

    // next
    expressServer.all("*", (req, res) => nextRouter(req, res));

    // listen
    expressServer.listen(env.PORT, () => console.log(">> Server initialized"));
  });
}

export { initializeServer };
