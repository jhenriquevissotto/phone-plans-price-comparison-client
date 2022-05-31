const { initializeEnv } = require("./environment/initiliaze-env");
initializeEnv();

const { initializeServer } = require("./backend/server/initialize-server");
initializeServer();
