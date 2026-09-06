"use client";

import { useEffect, useState } from "react";

import type { MailboxConnection } from "@inbox/db/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@inbox/ui/ui/dialog";

import { getCurrentUserMailAccounts } from "@/app/actions/mail-accounts";
import { MailAccountsPageClient } from "@/app/dashboard/settings/mail-accounts/mail-accounts-page-client";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [accounts, setAccounts] = useState<MailboxConnection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      void getCurrentUserMailAccounts()
        .then(setAccounts)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your mail accounts and preferences.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <MailAccountsPageClient initialAccounts={accounts} />
        )}
      </DialogContent>
    </Dialog>
  );
}
