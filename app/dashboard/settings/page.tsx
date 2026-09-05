import { MailAccountsPageClient } from "./mail-accounts/mail-accounts-page-client";

import { listMailAccounts } from "@/app/actions/mail-accounts";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const accounts = await listMailAccounts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      <MailAccountsPageClient initialAccounts={accounts} />
    </div>
  );
}
