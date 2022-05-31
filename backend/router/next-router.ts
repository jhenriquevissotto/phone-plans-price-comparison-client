import { nextServer } from "../../backend/server/next-server";

const nextRouter = nextServer.getRequestHandler();

export { nextRouter };
