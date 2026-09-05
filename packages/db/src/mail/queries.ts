/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/require-await */
import { eq, and } from "drizzle-orm";

import { getDb } from "../index";
import { mailboxConnections } from "../schema";

import type { InsertMailboxConnection, MailboxConnection } from "../schema";

async function getDrizzleDb() {
  return getDb() as any;
}

export async function createMailboxConnection(
  data: InsertMailboxConnection,
): Promise<MailboxConnection> {
  const drizzleDb = await getDrizzleDb();
  const connections = await drizzleDb
    .insert(mailboxConnections)
    .values(data)
    .returning();
  if (!connections[0]) {
    throw new Error("Failed to create mailbox connection");
  }
  return connections[0];
}

export async function getMailboxConnectionById(
  id: string,
): Promise<MailboxConnection | null> {
  const drizzleDb = await getDrizzleDb();
  const connections = await drizzleDb
    .select()
    .from(mailboxConnections)
    .where(eq(mailboxConnections.id, id));
  return connections[0] ?? null;
}

export async function getMailboxConnectionsByUserId(
  userId: string,
): Promise<MailboxConnection[]> {
  const drizzleDb = await getDrizzleDb();
  return drizzleDb
    .select()
    .from(mailboxConnections)
    .where(eq(mailboxConnections.userId, userId));
}

export async function getDefaultMailboxConnection(
  userId: string,
): Promise<MailboxConnection | null> {
  const drizzleDb = await getDrizzleDb();
  const connections = await drizzleDb
    .select()
    .from(mailboxConnections)
    .where(
      and(
        eq(mailboxConnections.userId, userId),
        eq(mailboxConnections.isDefault, true),
      ),
    );
  return connections[0] ?? null;
}

export async function setDefaultMailboxConnection(
  userId: string,
  id: string,
): Promise<void> {
  const drizzleDb = await getDrizzleDb();
  await drizzleDb.transaction(async (tx: any) => {
    await tx
      .update(mailboxConnections)
      .set({ isDefault: false })
      .where(eq(mailboxConnections.userId, userId));
    await tx
      .update(mailboxConnections)
      .set({ isDefault: true })
      .where(eq(mailboxConnections.id, id));
  });
}

export async function updateMailboxConnectionStatus(
  id: string,
  status: MailboxConnection["status"],
  lastError?: string,
): Promise<MailboxConnection> {
  const drizzleDb = await getDrizzleDb();
  const connections = await drizzleDb
    .update(mailboxConnections)
    .set({ status, lastError: lastError ?? null, updatedAt: new Date() })
    .where(eq(mailboxConnections.id, id))
    .returning();
  if (!connections[0]) {
    throw new Error("Failed to update mailbox connection status");
  }
  return connections[0];
}

export async function deleteMailboxConnection(id: string): Promise<void> {
  const drizzleDb = await getDrizzleDb();
  await drizzleDb
    .delete(mailboxConnections)
    .where(eq(mailboxConnections.id, id));
}
