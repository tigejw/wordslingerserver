import { Database } from "../types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: "test",
      host: "localhost",
      user: "admin",
      port: 3000,
      max: 10,
    }),
  }),
});
