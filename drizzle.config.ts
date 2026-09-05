import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

const projectDir = process.cwd();
const { combinedEnv } = loadEnvConfig(projectDir);

Object.assign(process.env, combinedEnv);

export default defineConfig({
  schema: "./packages/db/src/schema.ts",
  out: "./packages/db/src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"] || "",
  },
});
