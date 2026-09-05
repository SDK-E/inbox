/// <reference types="vitest/globals" />

import {
  buildImapConfig,
  buildSmtpTransport,
  verifyImap,
  verifySmtp,
} from "@inbox/db/mail/adapters";
import nodemailer from "nodemailer";
import { describe, expect, it, vi } from "vitest";

import type { MailboxConnection } from "@inbox/db/schema";

const baseConnection: MailboxConnection = {
  id: "conn_1",
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
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastValidatedAt: new Date(),
};

describe("mail adapters", () => {
  describe("buildImapConfig", () => {
    it("builds gmail imap config with access token", () => {
      const config = buildImapConfig(baseConnection, "token123");
      expect(config).toEqual({
        host: "imap.gmail.com",
        port: 993,
        secure: true,
        auth: { user: "user@gmail.com", accessToken: "token123" },
      });
    });

    it("builds outlook imap config", () => {
      const connection = {
        ...baseConnection,
        provider: "outlook",
        imapHost: "outlook.office365.com",
        oauthProvider: "microsoft",
      } as MailboxConnection;
      const config = buildImapConfig(connection, "token456");
      expect(config).toEqual({
        host: "outlook.office365.com",
        port: 993,
        secure: true,
        auth: { user: "user@gmail.com", accessToken: "token456" },
      });
    });

    it("builds generic imap config with password", () => {
      const connection = {
        ...baseConnection,
        provider: "imap",
        imapHost: "mail.example.com",
        imapPort: 143,
        oauthProvider: null,
      } as MailboxConnection;
      const config = buildImapConfig(connection, null, "pass123");
      expect(config).toEqual({
        host: "mail.example.com",
        port: 143,
        secure: false,
        auth: { user: "user@gmail.com", pass: "pass123" },
      });
    });
  });

  describe("buildSmtpTransport", () => {
    it("builds gmail smtp transport with access token", () => {
      const transport = buildSmtpTransport(baseConnection, "token123");
      expect(transport).toBeDefined();
    });

    it("builds generic smtp transport with password", () => {
      const transport = buildSmtpTransport(baseConnection, null, "pass123");
      expect(transport).toBeDefined();
    });
  });

  describe("verifyImap", () => {
    it("returns success on valid connection", async () => {
      const { ImapFlow } = await import("imapflow");
      const mockConnect = vi.fn().mockResolvedValue(undefined);
      const mockLogout = vi.fn().mockResolvedValue(undefined);
      const mockList = vi.fn().mockResolvedValue([{ path: ["INBOX"] }]);
      vi.spyOn(ImapFlow.prototype, "connect").mockImplementation(
        mockConnect as unknown as typeof ImapFlow.prototype.connect,
      );
      vi.spyOn(ImapFlow.prototype, "logout").mockImplementation(
        mockLogout as unknown as typeof ImapFlow.prototype.logout,
      );
      vi.spyOn(ImapFlow.prototype, "list").mockImplementation(
        mockList as unknown as typeof ImapFlow.prototype.list,
      );

      const result = await verifyImap(baseConnection, "token");
      expect(result.success).toBe(true);
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });

    it("returns failure on auth error", async () => {
      const { ImapFlow } = await import("imapflow");
      const mockClient = {
        connect: vi
          .fn()
          .mockRejectedValue(
            new Error("AUTHENTICATIONFAILED Invalid credentials"),
          ),
        logout: vi.fn(),
      };
      vi.spyOn(ImapFlow.prototype, "connect").mockImplementation(
        mockClient.connect as unknown as typeof ImapFlow.prototype.connect,
      );
      vi.spyOn(ImapFlow.prototype, "logout").mockImplementation(
        mockClient.logout as unknown as typeof ImapFlow.prototype.logout,
      );

      const result = await verifyImap(baseConnection, "bad-token");
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("verifySmtp", () => {
    it("returns success on valid connection", async () => {
      const mockTransport = {
        verify: vi.fn().mockResolvedValue(undefined),
      };
      vi.spyOn(nodemailer, "createTransport").mockReturnValue(
        mockTransport as unknown as ReturnType<
          typeof nodemailer.createTransport
        >,
      );
      const result = await verifySmtp(baseConnection, "token");
      expect(result.success).toBe(true);
    });

    it("returns failure on connection error", async () => {
      const mockTransport = {
        verify: vi.fn().mockRejectedValue(new Error("Connection refused")),
      };
      vi.spyOn(nodemailer, "createTransport").mockReturnValue(
        mockTransport as unknown as ReturnType<
          typeof nodemailer.createTransport
        >,
      );
      const connection = {
        ...baseConnection,
        smtpHost: "invalid.host",
        smtpPort: 25,
      } as MailboxConnection;
      const result = await verifySmtp(connection, "token");
      expect(result.success).toBe(false);
    });
  });
});
