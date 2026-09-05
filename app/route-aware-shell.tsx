"use client";

import { AppShell } from "@inbox/ui/app-shell";
import { usePathname } from "next/navigation";

import { CommandPaletteWrapper } from "./command-palette-wrapper";

export function RouteAwareShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboard) {
    return (
      <AppShell>
        {children}
        <CommandPaletteWrapper />
      </AppShell>
    );
  }

  return <>{children}</>;
}
