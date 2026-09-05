"use client";

import {
  Archive,
  Clock,
  FileText,
  InboxIcon,
  Plus,
  Send,
  Settings,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@inbox/ui/ui/sidebar";

const primaryNav = [
  { href: "/dashboard", icon: InboxIcon, label: "Inbox" },
  { href: "/dashboard/starred", icon: Star, label: "Starred" },
  { href: "/dashboard/snoozed", icon: Clock, label: "Snoozed" },
  { href: "/dashboard/sent", icon: Send, label: "Sent" },
  { href: "/dashboard/drafts", icon: FileText, label: "Drafts" },
  { href: "/dashboard/scheduled", icon: Clock, label: "Scheduled" },
  { href: "/dashboard/archive", icon: Archive, label: "Archive" },
  { href: "/dashboard/trash", icon: Trash2, label: "Trash" },
];

const secondaryNav = [
  { href: "/dashboard/contacts", icon: Users, label: "Contacts" },
  { href: "/dashboard/rules", icon: Settings, label: "Rules" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const accountFolders = [
  { href: "/dashboard/accounts/1/inbox", icon: InboxIcon, name: "Inbox" },
  { href: "/dashboard/accounts/1/sent", icon: Send, name: "Sent" },
  { href: "/dashboard/accounts/1/drafts", icon: FileText, name: "Drafts" },
  { href: "/dashboard/accounts/1/archive", icon: Archive, name: "Archive" },
  { href: "/dashboard/accounts/1/trash", icon: Trash2, name: "Trash" },
];

export function AppNavigation() {
  const pathname = usePathname();
  const [accountsOpen, setAccountsOpen] = useState(false);

  return (
    <>
      <PrimaryNav pathname={pathname} />
      <AccountsSection
        accountsOpen={accountsOpen}
        onToggleAccounts={() => {
          setAccountsOpen(!accountsOpen);
        }}
        pathname={pathname}
      />
      <SecondaryNav pathname={pathname} />
    </>
  );
}

function PrimaryNav({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {primaryNav.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={<Link href={item.href} />}
                isActive={pathname === item.href}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function AccountsSection({
  accountsOpen,
  onToggleAccounts,
  pathname,
}: {
  accountsOpen: boolean;
  onToggleAccounts: () => void;
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Accounts</SidebarGroupLabel>
      <SidebarGroupAction>
        <button
          type="button"
          onClick={onToggleAccounts}
          aria-expanded={accountsOpen}
          className="rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Plus
            className="h-3 w-3 transition-transform"
            style={{
              transform: accountsOpen ? "rotate(45deg)" : "rotate(0)",
            }}
          />
        </button>
      </SidebarGroupAction>
      <SidebarGroupContent>
        {accountsOpen && (
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <span className="truncate">user@example.com</span>
              </div>
            </SidebarMenuItem>
            {accountFolders.map(folder => (
              <SidebarMenuItem key={folder.href}>
                <SidebarMenuButton
                  render={<Link href={folder.href} />}
                  isActive={pathname === folder.href}
                >
                  <folder.icon />
                  <span>{folder.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SecondaryNav({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {secondaryNav.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={<Link href={item.href} />}
                isActive={pathname === item.href}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
