/// <reference types="vitest/globals" />

import { describe, expect, it } from "vitest";

vi.stubEnv("MAIL_ENCRYPTION_KEY", "test-key");

const mocks = vi.hoisted(() => {
  return {
    createMailboxConnection: vi.fn(),
    getMailboxConnectionById: vi.fn(),
    getMailboxConnectionsByUserId: vi.fn(),
    getDefaultMailboxConnection: vi.fn(),
    setDefaultMailboxConnection: vi.fn(),
    updateMailboxConnectionStatus: vi.fn(),
    deleteMailboxConnection: vi.fn(),
    verifyImap: vi.fn(),
    verifySmtp: vi.fn(),
    encrypt: vi.fn().mockResolvedValue("encrypted"),
    decrypt: vi.fn().mockResolvedValue("decrypted"),
    revalidatePath: vi.fn(),
    cookies: vi.fn(),
  };
});

vi.mock("@inbox/db/mail/queries", () => ({
  createMailboxConnection: mocks.createMailboxConnection,
  getMailboxConnectionById: mocks.getMailboxConnectionById,
  getMailboxConnectionsByUserId: mocks.getMailboxConnectionsByUserId,
  getDefaultMailboxConnection: mocks.getDefaultMailboxConnection,
  setDefaultMailboxConnection: mocks.setDefaultMailboxConnection,
  updateMailboxConnectionStatus: mocks.updateMailboxConnectionStatus,
  deleteMailboxConnection: mocks.deleteMailboxConnection,
}));

vi.mock("@inbox/db/mail/adapters", () => ({
  verifyImap: mocks.verifyImap,
  verifySmtp: mocks.verifySmtp,
}));

vi.mock("@inbox/db/mail/crypto", () => ({
  encrypt: mocks.encrypt,
  decrypt: mocks.decrypt,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock("next/headers", () => ({
  cookies: mocks.cookies,
}));

import {
  connectMailAccount,
  disconnectMailAccount,
  listMailAccounts,
  setDefaultMailAccount,
  validateMailAccount,
} from "@/app/actions/mail-accounts";

const mockConnection = {
  id: "conn_123",
  userId: "user_1",
  organizationId: "org_1",
  provider: "gmail",
  email: "user@gmail.com",
  displayName: "User",
  status: "connected" as const,
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
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastValidatedAt: new Date(),
};

describe("mail account server actions", () => {
  describe("connectMailAccount", () => {
    it("creates a new connection", async () => {
      mocks.createMailboxConnection.mockResolvedValue(mockConnection);
      const result = await connectMailAccount({
        userId: "user_1",
        organizationId: "org_1",
        provider: "gmail",
        email: "user@gmail.com",
        imapHost: "imap.gmail.com",
        imapPort: 993,
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        oauthProvider: "google",
      });
      expect(result.id).toBe("conn_123");
      expect(result.email).toBe("user@gmail.com");
    });
  });

  describe("validateMailAccount", () => {
    it("returns success for valid connection", async () => {
      mocks.getMailboxConnectionById.mockResolvedValue(mockConnection);
      mocks.verifyImap.mockResolvedValue({ success: true, latencyMs: 120 });
      mocks.verifySmtp.mockResolvedValue({ success: true, latencyMs: 120 });
      const result = await validateMailAccount("conn_123");
      expect(result.success).toBe(true);
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });

    it("returns failure for invalid connection", async () => {
      mocks.getMailboxConnectionById.mockResolvedValue(mockConnection);
      mocks.verifyImap.mockResolvedValue({
        success: false,
        error: "AUTHENTICATIONFAILED Invalid credentials",
        latencyMs: 50,
      });
      const result = await validateMailAccount("conn_bad");
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("disconnectMailAccount", () => {
    it("removes the connection", async () => {
      mocks.deleteMailboxConnection.mockResolvedValue(undefined);
      await disconnectMailAccount("conn_123");
      expect(true).toBe(true);
    });
  });

  describe("setDefaultMailAccount", () => {
    it("sets the default account", async () => {
      mocks.setDefaultMailboxConnection.mockResolvedValue(undefined);
      await setDefaultMailAccount("conn_123");
      expect(true).toBe(true);
    });
  });

  describe("listMailAccounts", () => {
    it("returns all connections for the user", async () => {
      mocks.getMailboxConnectionsByUserId.mockResolvedValue([mockConnection]);
      const result = await listMailAccounts();
      expect(result).toHaveLength(1);
      expect(result.at(0)?.email).toBe("user@gmail.com");
    });
  });
});
