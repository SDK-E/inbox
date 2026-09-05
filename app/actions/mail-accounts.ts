"use server";

import { verifyImap, verifySmtp } from "@inbox/db/mail/adapters";
import { decrypt, encrypt } from "@inbox/db/mail/crypto";
import {
  createMailboxConnection,
  deleteMailboxConnection,
  getMailboxConnectionById,
  getMailboxConnectionsByUserId,
  setDefaultMailboxConnection,
  updateMailboxConnectionStatus,
} from "@inbox/db/mail/queries";
import { revalidatePath } from "next/cache";
import { z } from "zod";

function getEncryptionKey(): string {
  const key = process.env["MAIL_ENCRYPTION_KEY"];
  if (!key) {
    throw new Error("MAIL_ENCRYPTION_KEY is required");
  }
  return key;
}

const connectSchema = z.object({
  userId: z.string(),
  organizationId: z.string(),
  provider: z.string(),
  email: z.email(),
  displayName: z.string().optional(),
  imapHost: z.string().optional(),
  imapPort: z.number().optional(),
  smtpHost: z.string().optional(),
  smtpPort: z.number().optional(),
  oauthProvider: z.string().optional(),
  password: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

export async function connectMailAccount(input: unknown) {
  const data = connectSchema.parse(input);

  const encryptedCredentials = data.password
    ? encrypt(data.password, getEncryptionKey())
    : null;
  const oauthAccessToken = data.accessToken
    ? encrypt(data.accessToken, getEncryptionKey())
    : null;
  const oauthRefreshToken = data.refreshToken
    ? encrypt(data.refreshToken, getEncryptionKey())
    : null;

  const connection = await createMailboxConnection({
    userId: data.userId,
    organizationId: data.organizationId,
    provider: data.provider,
    email: data.email,
    displayName: data.displayName,
    imapHost: data.imapHost,
    imapPort: data.imapPort,
    smtpHost: data.smtpHost,
    smtpPort: data.smtpPort,
    oauthProvider: data.oauthProvider,
    encryptedCredentials,
    oauthAccessToken,
    oauthRefreshToken,
  });

  revalidatePath("/dashboard/settings");
  return connection;
}

export async function validateMailAccount(id: string) {
  const connection = await getMailboxConnectionById(id);
  if (!connection) {
    throw new Error("Connection not found");
  }

  let decryptedPassword: string | null = null;
  let decryptedAccessToken: string | null = null;

  if (connection.encryptedCredentials) {
    decryptedPassword = decrypt(
      connection.encryptedCredentials,
      getEncryptionKey(),
    );
  }
  if (connection.oauthAccessToken) {
    decryptedAccessToken = decrypt(
      connection.oauthAccessToken,
      getEncryptionKey(),
    );
  }

  const imapResult = await verifyImap(
    connection,
    decryptedAccessToken,
    decryptedPassword,
  );
  const smtpResult = await verifySmtp(
    connection,
    decryptedAccessToken,
    decryptedPassword,
  );

  if (!imapResult.success || !smtpResult.success) {
    const error = imapResult.error ?? smtpResult.error ?? "Validation failed";
    await updateMailboxConnectionStatus(id, "error", error);
    return { success: false, error };
  }

  await updateMailboxConnectionStatus(id, "connected");
  return { success: true, latencyMs: imapResult.latencyMs };
}

export async function disconnectMailAccount(id: string) {
  await deleteMailboxConnection(id);
  revalidatePath("/dashboard/settings");
}

export async function setDefaultMailAccount(id: string) {
  await setDefaultMailboxConnection("user_1", id);
  revalidatePath("/dashboard/settings");
}

export async function listMailAccounts() {
  try {
    return await getMailboxConnectionsByUserId("user_1");
  } catch (error) {
    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return [];
    }
    throw error;
  }
}
