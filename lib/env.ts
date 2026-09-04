import "server-only";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().optional(),
  DATABASE_URL_UNPOOLED: z.string().optional(),
  BROWSERBASE_API_KEY: z.string().optional(),
  BROWSERBASE_PROJECT_ID: z.string().optional(),
});

export type Env = z.infer<typeof schema>;

function validateEnv(): Env {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = z.treeifyError(parsed.error);
    console.error("Environment validation failed:", issues);
    throw new Error("Invalid environment configuration");
  }
  return parsed.data;
}

export const env = validateEnv();
