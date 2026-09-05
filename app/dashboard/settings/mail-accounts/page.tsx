import { MailAccountsPageClient } from "./mail-accounts-page-client";

import { listMailAccounts } from "@/app/actions/mail-accounts";

export const dynamic = "force-dynamic";

export default async function MailAccountsSettingsPage() {
  const accounts = await listMailAccounts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Mail Accounts</h1>
        <p className="text-muted-foreground">
          Manage your connected mailboxes and connection settings.
        </p>
      </div>

      <MailAccountsPageClient initialAccounts={accounts} />
    </div>
  );
}
