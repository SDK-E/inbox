"use client";

import { Card } from "@inbox/ui/ui/card";
import { Mail } from "lucide-react";

import type { MailboxConnection } from "@inbox/db/schema";

import { AccountCard } from "./account-card";

interface AccountListProps {
  accounts: MailboxConnection[];
  onValidate: (id: string) => void;
  onSetDefault: (id: string) => void;
  onDisconnect: (id: string) => void;
}

export function AccountList({
  accounts,
  onValidate,
  onSetDefault,
  onDisconnect,
}: AccountListProps) {
  if (accounts.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        <Mail className="mx-auto mb-2 size-8" />
        <p>No mail accounts connected yet.</p>
        <p className="text-sm">Click &quot;Add Account&quot; to get started.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {accounts.map(account => (
        <AccountCard
          key={account.id}
          account={account}
          onValidate={onValidate}
          onSetDefault={onSetDefault}
          onDisconnect={onDisconnect}
        />
      ))}
    </div>
  );
}
