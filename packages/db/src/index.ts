/* eslint-disable @typescript-eslint/unbound-method */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { mailboxConnections } from "./schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb(): ReturnType<typeof drizzle> {
  if (!dbInstance) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dbInstance = drizzle(neon(process.env["DATABASE_URL"]!));
  }
  return dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get: (_target, prop) => {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  },
});

export { mailboxConnections };
export * as mailCrypto from "./mail/crypto";
export * as mailAdapters from "./mail/adapters";
export * as mailQueries from "./mail/queries";
export type { MailboxConnection, InsertMailboxConnection } from "./schema";
