import knex from "knex";
import { env } from "../../environment/env";

const db = knex({
  client: "mysql",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASS,
  },
});

export { db };
