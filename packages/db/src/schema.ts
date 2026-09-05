import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const mailboxConnections = pgTable("mailbox_connections", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  organizationId: text("organization_id").notNull(),
  provider: text("provider").notNull(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  status: text("status").notNull().default("disconnected"),
  imapHost: text("imap_host"),
  imapPort: integer("imap_port"),
  smtpHost: text("smtp_host"),
  smtpPort: integer("smtp_port"),
  oauthProvider: text("oauth_provider"),
  encryptedCredentials: text("encrypted_credentials"),
  oauthRefreshToken: text("oauth_refresh_token"),
  oauthAccessToken: text("oauth_access_token"),
  oauthExpiresAt: timestamp("oauth_expires_at", { mode: "date" }),
  lastError: text("last_error"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  lastValidatedAt: timestamp("last_validated_at", { mode: "date" }),
});

export type MailboxConnection = typeof mailboxConnections.$inferSelect;
export type InsertMailboxConnection = typeof mailboxConnections.$inferInsert;
