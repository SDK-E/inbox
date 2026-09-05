/* eslint-disable max-lines-per-function */
"use client";

import { Alert, AlertDescription, AlertTitle } from "@inbox/ui/ui/alert";
import { useState } from "react";

import type { MailboxConnection } from "@inbox/db/schema";

import { AccountList } from "./components/account-list";
import { AddAccountDialog } from "./components/add-account-dialog";

interface MailAccountsPageClientProps {
  initialAccounts: MailboxConnection[];
}

export function MailAccountsPageClient({
  initialAccounts,
}: MailAccountsPageClientProps) {
  const [accounts, setAccounts] =
    useState<MailboxConnection[]>(initialAccounts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleConnect = async (formData: {
    provider: string;
    email: string;
    displayName: string;
    imapHost: string;
    imapPort: number;
    smtpHost: string;
    smtpPort: number;
    oauthProvider: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/mail-accounts/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_1",
          organizationId: "org_1",
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect account");
      }

      const newAccount = (await response.json()) as MailboxConnection;
      setAccounts([...accounts, newAccount]);
      setSuccess("Account connected successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async (id: string) => {
    try {
      await fetch(`/api/mail-accounts/${id}/disconnect`, { method: "DELETE" });
      setAccounts(accounts.filter(a => a.id !== id));
      setSuccess("Account disconnected");
    } catch {
      setError("Failed to disconnect account");
    }
  };

  const handleValidate = async (id: string) => {
    try {
      const response = await fetch(`/api/mail-accounts/${id}/validate`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Validation failed");
      setSuccess("Connection validated successfully");
    } catch {
      setError("Failed to validate connection");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await fetch(`/api/mail-accounts/${id}/default`, { method: "POST" });
      setAccounts(accounts.map(a => ({ ...a, isDefault: a.id === id })));
      setSuccess("Default account updated");
    } catch {
      setError("Failed to set default account");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <AddAccountDialog onConnect={handleConnect} isLoading={isLoading} />
      </div>

      <AccountList
        accounts={accounts}
        onValidate={id => {
          void handleValidate(id);
        }}
        onSetDefault={id => {
          void handleSetDefault(id);
        }}
        onDisconnect={id => {
          void handleDisconnect(id);
        }}
      />
    </div>
  );
}
