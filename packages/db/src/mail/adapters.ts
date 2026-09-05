import { ImapFlow } from "imapflow";
import nodemailer from "nodemailer";

import type { MailboxConnection } from "@inbox/db/schema";

import type SMTPTransport from "nodemailer/lib/smtp-transport";

export interface ImapConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass?: string } | { user: string; accessToken: string };
}

export interface VerifyResult {
  success: boolean;
  error?: string;
  latencyMs: number;
}

export function buildImapConfig(
  connection: MailboxConnection,
  decryptedAccessToken?: string | null,
  decryptedPassword?: string | null,
): ImapConfig {
  const secure = (connection.imapPort ?? 993) === 993;
  const auth =
    decryptedAccessToken && connection.oauthProvider
      ? { user: connection.email, accessToken: decryptedAccessToken }
      : decryptedPassword
        ? { user: connection.email, pass: decryptedPassword }
        : { user: connection.email };

  return {
    host: connection.imapHost ?? "localhost",
    port: connection.imapPort ?? 993,
    secure,
    auth,
  };
}

export function buildSmtpTransport(
  connection: MailboxConnection,
  decryptedAccessToken?: string | null,
  decryptedPassword?: string | null,
) {
  const secure = (connection.smtpPort ?? 465) === 465;
  const auth:
    | { type: "OAUTH2"; user: string; oauth2: { accessToken: string } }
    | { user: string; pass: string }
    | undefined =
    decryptedAccessToken && connection.oauthProvider
      ? {
          type: "OAUTH2",
          user: connection.email,
          oauth2: { accessToken: decryptedAccessToken },
        }
      : decryptedPassword
        ? { user: connection.email, pass: decryptedPassword }
        : undefined;

  const options: SMTPTransport.Options = {
    host: connection.smtpHost ?? "localhost",
    port: connection.smtpPort ?? (secure ? 465 : 587),
    secure,
    auth,
  };

  return nodemailer.createTransport(options);
}

export async function verifyImap(
  connection: MailboxConnection,
  decryptedAccessToken?: string | null,
  decryptedPassword?: string | null,
): Promise<VerifyResult> {
  const start = Date.now();
  const config = buildImapConfig(
    connection,
    decryptedAccessToken,
    decryptedPassword,
  );
  const client = new ImapFlow(config);

  try {
    await client.connect();
    await client.list();
    await client.logout();
    return { success: true, latencyMs: Date.now() - start };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message, latencyMs: Date.now() - start };
  }
}

export async function verifySmtp(
  connection: MailboxConnection,
  decryptedAccessToken?: string | null,
  decryptedPassword?: string | null,
): Promise<VerifyResult> {
  const start = Date.now();
  const transport = buildSmtpTransport(
    connection,
    decryptedAccessToken,
    decryptedPassword,
  );

  try {
    await transport.verify();
    return { success: true, latencyMs: Date.now() - start };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message, latencyMs: Date.now() - start };
  }
}
