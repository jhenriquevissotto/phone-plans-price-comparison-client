import { nodeEnv } from "../../environment/node-env";
import createNextServer from "next";

const nextServer = createNextServer({ dev: nodeEnv.dev });

export { nextServer };
