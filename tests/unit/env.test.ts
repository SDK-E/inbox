/// <reference types="vitest/globals" />

import { z } from "zod";

const envSchema = z.object({
  WORKOS_API_KEY: z.string().min(1),
  WORKOS_CLIENT_ID: z.string().min(1),
  WORKOS_COOKIE_PASSWORD: z.string().min(32),
  NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.url("invalid redirect URI"),
  NEXT_PUBLIC_APP_URL: z.url("invalid app URL"),
});

describe("env validation", () => {
  it("parses valid env", () => {
    const env = envSchema.parse({
      WORKOS_API_KEY: "sk_test_123",
      WORKOS_CLIENT_ID: "client_123",
      WORKOS_COOKIE_PASSWORD: "a".repeat(32),
      NEXT_PUBLIC_WORKOS_REDIRECT_URI: "http://localhost:3000/callback",
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    });
    expect(env.WORKOS_API_KEY).toBe("sk_test_123");
    expect(env.WORKOS_CLIENT_ID).toBe("client_123");
    expect(env.WORKOS_COOKIE_PASSWORD).toBe("a".repeat(32));
  });

  it("rejects missing API key", () => {
    expect(() =>
      envSchema.parse({
        WORKOS_API_KEY: "",
        WORKOS_CLIENT_ID: "client_123",
        WORKOS_COOKIE_PASSWORD: "a".repeat(32),
        NEXT_PUBLIC_WORKOS_REDIRECT_URI: "http://localhost:3000/callback",
        NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      }),
    ).toThrow();
  });

  it("rejects short cookie password", () => {
    expect(() =>
      envSchema.parse({
        WORKOS_API_KEY: "sk_test_123",
        WORKOS_CLIENT_ID: "client_123",
        WORKOS_COOKIE_PASSWORD: "short",
        NEXT_PUBLIC_WORKOS_REDIRECT_URI: "http://localhost:3000/callback",
        NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      }),
    ).toThrow();
  });

  it("rejects invalid redirect URI", () => {
    expect(() =>
      envSchema.parse({
        WORKOS_API_KEY: "sk_test_123",
        WORKOS_CLIENT_ID: "client_123",
        WORKOS_COOKIE_PASSWORD: "a".repeat(32),
        NEXT_PUBLIC_WORKOS_REDIRECT_URI: "not-a-url",
        NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      }),
    ).toThrow();
  });
});
