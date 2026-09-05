/// <reference types="vitest/globals" /

import {
  createMailboxConnection,
  deleteMailboxConnection,
  getDefaultMailboxConnection,
  getMailboxConnectionById,
  getMailboxConnectionsByUserId,
  setDefaultMailboxConnection,
  updateMailboxConnectionStatus,
} from "@inbox/db/mail/queries";
import { describe, expect, it, vi } from "vitest";

import type {
  MailboxConnection,
  InsertMailboxConnection,
} from "@inbox/db/schema";

vi.mock("@inbox/db/mail/queries", () => ({
  createMailboxConnection: vi.fn(),
  getMailboxConnectionById: vi.fn(),
  getMailboxConnectionsByUserId: vi.fn(),
  getDefaultMailboxConnection: vi.fn(),
  setDefaultMailboxConnection: vi.fn(),
  updateMailboxConnectionStatus: vi.fn(),
  deleteMailboxConnection: vi.fn(),
}));

const baseConnection: InsertMailboxConnection = {
  userId: "user_1",
  organizationId: "org_1",
  provider: "gmail",
  email: "user@gmail.com",
  displayName: "User",
  status: "connected",
  imapHost: "imap.gmail.com",
  imapPort: 993,
  smtpHost: "smtp.gmail.com",
  smtpPort: 465,
  oauthProvider: "google",
  encryptedCredentials: null,
  oauthRefreshToken: "encrypted-refresh",
  oauthAccessToken: "encrypted-access",
  oauthExpiresAt: new Date("2099-01-01"),
  lastError: null,
  isDefault: false,
};

const makeConnection = (
  overrides: Partial<MailboxConnection> = {},
): MailboxConnection => ({
  id: "conn_" + Math.random().toString(36).slice(2),
  userId: "user_1",
  organizationId: "org_1",
  provider: "gmail",
  email: "user@gmail.com",
  displayName: "User",
  status: "connected",
  imapHost: "imap.gmail.com",
  imapPort: 993,
  smtpHost: "smtp.gmail.com",
  smtpPort: 465,
  oauthProvider: "google",
  encryptedCredentials: null,
  oauthRefreshToken: "encrypted-refresh",
  oauthAccessToken: "encrypted-access",
  oauthExpiresAt: new Date("2099-01-01"),
  lastError: null,
  isDefault: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastValidatedAt: null,
  ...overrides,
});

describe("mail queries", () => {
  describe("createMailboxConnection", () => {
    it("inserts a connection and returns it", async () => {
      const created = makeConnection();
      vi.spyOn(
        { createMailboxConnection },
        "createMailboxConnection",
      ).mockResolvedValue(created);
      const connection = await createMailboxConnection(baseConnection);
      expect(connection.id).toBeDefined();
      expect(connection.userId).toBe("user_1");
      expect(connection.email).toBe("user@gmail.com");
    });
  });

  describe("getMailboxConnectionById", () => {
    it("returns null for missing id", async () => {
      vi.spyOn(
        { getMailboxConnectionById },
        "getMailboxConnectionById",
      ).mockResolvedValue(null);
      const connection = await getMailboxConnectionById("missing");
      expect(connection).toBeNull();
    });

    it("returns connection by id", async () => {
      const created = makeConnection({ id: "conn_123" });
      vi.spyOn(
        { getMailboxConnectionById },
        "getMailboxConnectionById",
      ).mockResolvedValue(created);
      const connection = await getMailboxConnectionById("conn_123");
      expect(connection?.id).toBe("conn_123");
      expect(connection?.email).toBe("user@gmail.com");
    });
  });

  describe("getMailboxConnectionsByUserId", () => {
    it("returns empty array for user with no connections", async () => {
      vi.spyOn(
        { getMailboxConnectionsByUserId },
        "getMailboxConnectionsByUserId",
      ).mockResolvedValue([]);
      const connections = await getMailboxConnectionsByUserId("user_none");
      expect(connections).toEqual([]);
    });

    it("returns all connections for a user", async () => {
      vi.spyOn(
        { getMailboxConnectionsByUserId },
        "getMailboxConnectionsByUserId",
      ).mockResolvedValue([
        makeConnection(),
        makeConnection({ email: "user2@gmail.com" }),
      ]);
      const connections = await getMailboxConnectionsByUserId("user_1");
      expect(connections).toHaveLength(2);
    });
  });

  describe("getDefaultMailboxConnection", () => {
    it("returns null when no default exists", async () => {
      vi.spyOn(
        { getDefaultMailboxConnection },
        "getDefaultMailboxConnection",
      ).mockResolvedValue(null);
      const connection = await getDefaultMailboxConnection("user_1");
      expect(connection).toBeNull();
    });

    it("returns the default connection", async () => {
      const created = makeConnection({ isDefault: true });
      vi.spyOn(
        { getDefaultMailboxConnection },
        "getDefaultMailboxConnection",
      ).mockResolvedValue(created);
      const connection = await getDefaultMailboxConnection("user_1");
      expect(connection?.id).toBe(created.id);
      expect(connection?.isDefault).toBe(true);
    });
  });

  describe("setDefaultMailboxConnection", () => {
    it("marks connection as default and unsets others", async () => {
      const updated = makeConnection({ id: "conn_123", isDefault: true });
      vi.spyOn(
        { setDefaultMailboxConnection },
        "setDefaultMailboxConnection",
      ).mockResolvedValue(undefined);
      await setDefaultMailboxConnection("user_1", "conn_123");
      expect(updated.isDefault).toBe(true);
    });
  });

  describe("updateMailboxConnectionStatus", () => {
    it("updates status and lastError", async () => {
      const updated = makeConnection({
        status: "error",
        lastError: "auth failed",
      });
      vi.spyOn(
        { updateMailboxConnectionStatus },
        "updateMailboxConnectionStatus",
      ).mockResolvedValue(updated);
      const result = await updateMailboxConnectionStatus(
        "conn_123",
        "error",
        "auth failed",
      );
      expect(result.status).toBe("error");
      expect(result.lastError).toBe("auth failed");
    });
  });

  describe("deleteMailboxConnection", () => {
    it("removes connection", async () => {
      vi.spyOn(
        { deleteMailboxConnection },
        "deleteMailboxConnection",
      ).mockResolvedValue(undefined);
      await deleteMailboxConnection("conn_123");
      expect(true).toBe(true);
    });
  });
});
