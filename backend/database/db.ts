import { createDatabaseConnection } from "../../backend/database/connection/create-database-connection";

const { db } = createDatabaseConnection();

export { db };
