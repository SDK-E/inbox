/* eslint-disable max-lines-per-function */
"use client";

import { Badge } from "@inbox/ui/ui/badge";
import { Button } from "@inbox/ui/ui/button";
import { Mail, Star, RefreshCw, Trash2 } from "lucide-react";

import type { MailboxConnection } from "@inbox/db/schema";

interface AccountCardProps {
  account: MailboxConnection;
  onValidate: (id: string) => void;
  onSetDefault: (id: string) => void;
  onDisconnect: (id: string) => void;
}

export function AccountCard({
  account,
  onValidate,
  onSetDefault,
  onDisconnect,
}: AccountCardProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      <div className="flex items-center gap-3">
        <Mail className="size-5 text-muted-foreground" />
        <div>
          <div className="font-medium">
            {account.displayName || account.email}
            {account.isDefault && (
              <Badge variant="secondary" className="ml-2">
                <Star className="mr-1 size-3" />
                Default
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{account.email}</div>
          <div className="text-xs text-muted-foreground">
            {account.provider} • {account.status}
            {account.lastError && ` • ${account.lastError}`}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            onValidate(account.id);
          }}
          title="Validate connection"
        >
          <RefreshCw className="size-4" />
        </Button>
        {!account.isDefault && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              onSetDefault(account.id);
            }}
            title="Set as default"
          >
            <Star className="size-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            onDisconnect(account.id);
          }}
          title="Disconnect"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
