export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your email activity and accounts.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-sm text-muted-foreground">Unread</div>
          <div className="mt-1 text-2xl font-semibold">12</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-sm text-muted-foreground">Starred</div>
          <div className="mt-1 text-2xl font-semibold">5</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-sm text-muted-foreground">Accounts</div>
          <div className="mt-1 text-2xl font-semibold">3</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-sm text-muted-foreground">Snoozed</div>
          <div className="mt-1 text-2xl font-semibold">2</div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-medium">Recent Activity</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No recent activity to show. Start by connecting a mail account or
          selecting a message from the list.
        </p>
      </div>
    </div>
  );
}
