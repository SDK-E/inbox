import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { serverEnv } from "@/lib/env";

import * as schema from "./schema";

const databaseUrl = serverEnv.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for database operations");
}
const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
export type DB = typeof db;
