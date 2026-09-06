"use client";

import { CommandPalette } from "@inbox/ui/command-palette";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const COMMAND_ITEMS = [
  {
    id: "inbox",
    title: "Go to Inbox",
    description: "View your inbox",
    keywords: ["inbox", "home"],
    href: "/dashboard",
  },
  {
    id: "starred",
    title: "Go to Starred",
    description: "View starred messages",
    keywords: ["starred", "favorites"],
    href: "/dashboard/starred",
  },
  {
    id: "sent",
    title: "Go to Sent",
    description: "View sent messages",
    keywords: ["sent", "outbox"],
    href: "/dashboard/sent",
  },
  {
    id: "drafts",
    title: "Go to Drafts",
    description: "View draft messages",
    keywords: ["drafts", "unsent"],
    href: "/dashboard/drafts",
  },
  {
    id: "archive",
    title: "Go to Archive",
    description: "View archived messages",
    keywords: ["archive", "archived"],
    href: "/dashboard/archive",
  },
  {
    id: "trash",
    title: "Go to Trash",
    description: "View deleted messages",
    keywords: ["trash", "deleted", "bin"],
    href: "/dashboard/trash",
  },
  {
    id: "settings",
    title: "Open Settings",
    description: "Manage your account settings",
    keywords: ["settings", "preferences", "config"],
    href: "/dashboard/settings",
  },
];

export function CommandPaletteWrapper() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  const items = COMMAND_ITEMS.map(item => ({
    ...item,
    action: () => {
      router.push(item.href);
    },
  }));

  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      search={search}
      onSearchChange={setSearch}
      items={items}
    />
  );
}
