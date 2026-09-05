/// <reference types="vitest/globals" />

import { describe, expect, it } from "vitest";

const KEY = Buffer.from("0123456789abcdef0123456789abcdef").toString("base64");

describe("mail crypto", () => {
  it("encrypts and decrypts a secret", async () => {
    const { encrypt, decrypt } = await import("@inbox/db/mail/crypto");
    const secret = "hunter2";
    const encrypted = await encrypt(secret, KEY);
    expect(encrypted).not.toBe(secret);
    const decrypted = await decrypt(encrypted, KEY);
    expect(decrypted).toBe(secret);
  });

  it("fails to decrypt with wrong key", async () => {
    const { encrypt, decrypt } = await import("@inbox/db/mail/crypto");
    const encrypted = await encrypt("secret", KEY);
    const wrongKey = Buffer.from("ffffffffffffffffffffffffffffffff").toString(
      "base64",
    );
    expect(() => decrypt(encrypted, wrongKey)).toThrow();
  });

  it("fails to decrypt tampered ciphertext", async () => {
    const { encrypt, decrypt } = await import("@inbox/db/mail/crypto");
    const encrypted = await encrypt("secret", KEY);
    const tampered = encrypted.slice(0, -10) + "ZZZZZZZZZZ";
    expect(() => decrypt(tampered, KEY)).toThrow();
  });

  it("returns different ciphertext for same input", async () => {
    const { encrypt } = await import("@inbox/db/mail/crypto");
    const a = await encrypt("secret", KEY);
    const b = await encrypt("secret", KEY);
    expect(a).not.toBe(b);
  });
});
