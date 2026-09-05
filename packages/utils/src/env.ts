import "server-only";

import { z } from "zod";

export const envSchema = z.object({
  WORKOS_API_KEY: z.string().min(1),
  WORKOS_CLIENT_ID: z.string().min(1),
  WORKOS_COOKIE_PASSWORD: z.string().min(32),
  NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.url("invalid redirect URI"),
  NEXT_PUBLIC_APP_URL: z.url("invalid app URL"),
});

function getEnvValue(key: string): string | undefined {
  return process.env[key];
}

export const env = envSchema.parse({
  WORKOS_API_KEY: getEnvValue("WORKOS_API_KEY"),
  WORKOS_CLIENT_ID: getEnvValue("WORKOS_CLIENT_ID"),
  WORKOS_COOKIE_PASSWORD: getEnvValue("WORKOS_COOKIE_PASSWORD"),
  NEXT_PUBLIC_WORKOS_REDIRECT_URI: getEnvValue(
    "NEXT_PUBLIC_WORKOS_REDIRECT_URI",
  ),
  NEXT_PUBLIC_APP_URL: getEnvValue("NEXT_PUBLIC_APP_URL"),
});
