"use client";

import { AppShell } from "@inbox/ui/app-shell";
import { SettingsDialog } from "@inbox/ui/settings-dialog";
import { ErrorBoundary } from "@inbox/ui/ui/error-boundary";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CommandPaletteWrapper } from "./command-palette-wrapper";

export function RouteAwareShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (isDashboard) {
    return (
      <ErrorBoundary>
        <AppShell
          settingsOpen={settingsOpen}
          onSettingsOpenChange={setSettingsOpen}
          onOpenSettings={() => {
            setSettingsOpen(true);
          }}
        >
          {children}
          <CommandPaletteWrapper />
          <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
        </AppShell>
      </ErrorBoundary>
    );
  }

  return <>{children}</>;
}
