import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url(),
});

const serverSchema = z.object({
  DATABASE_URL: z.url().optional(),
  DATABASE_URL_UNPOOLED: z.url().optional(),
  BROWSERBASE_API_KEY: z.string().optional(),
  BROWSERBASE_PROJECT_ID: z.string().optional(),
});

export type PublicEnv = z.infer<typeof publicSchema>;
export type ServerEnv = z.infer<typeof serverSchema>;

export const publicEnv = publicSchema.parse(process.env);
export const serverEnv = serverSchema.parse(process.env);
