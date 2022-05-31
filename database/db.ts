import { createDatabaseConnection } from "./connection/create-database-connection";

const { db } = createDatabaseConnection();

export { db };
