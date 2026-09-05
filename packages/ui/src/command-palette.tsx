"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@inbox/ui/ui/command";

interface CommandPaletteItem {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  action?: () => void;
}

const DEFAULT_ITEMS: CommandPaletteItem[] = [
  {
    id: "inbox",
    title: "Go to Inbox",
    description: "View your inbox",
    keywords: ["inbox", "home"],
  },
  {
    id: "starred",
    title: "Go to Starred",
    description: "View starred messages",
    keywords: ["starred", "favorites"],
  },
  {
    id: "sent",
    title: "Go to Sent",
    description: "View sent messages",
    keywords: ["sent", "outbox"],
  },
  {
    id: "drafts",
    title: "Go to Drafts",
    description: "View draft messages",
    keywords: ["drafts", "unsent"],
  },
  {
    id: "archive",
    title: "Go to Archive",
    description: "View archived messages",
    keywords: ["archive", "archived"],
  },
  {
    id: "trash",
    title: "Go to Trash",
    description: "View deleted messages",
    keywords: ["trash", "deleted", "bin"],
  },
  {
    id: "settings",
    title: "Open Settings",
    description: "Manage your account settings",
    keywords: ["settings", "preferences", "config"],
  },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: CommandPaletteItem[];
}

export function CommandPalette({
  open,
  onOpenChange,
  items = DEFAULT_ITEMS,
}: CommandPaletteProps) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Search mail, threads, contacts, settings..."
      className="sm:max-w-xl"
      showCloseButton
    >
      <CommandPaletteContent items={items} onOpenChange={onOpenChange} />
    </CommandDialog>
  );
}

function CommandPaletteContent({
  items,
  onOpenChange,
}: {
  items: CommandPaletteItem[];
  onOpenChange: (open: boolean) => void;
}) {
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return items;

    return items.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchDescription =
        item.description?.toLowerCase().includes(trimmed) ?? false;
      const matchKeywords =
        item.keywords?.some(keyword =>
          keyword.toLowerCase().includes(trimmed),
        ) ?? false;
      return matchTitle || matchDescription || matchKeywords;
    });
  }, [search, items]);

  const handleSelect = (item: CommandPaletteItem) => {
    setSearch("");
    onOpenChange(false);
    item.action?.();
  };

  return (
    <>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Search mail, threads, contacts, settings..."
        className="flex-1 border-0 border-b border-transparent bg-transparent text-sm outline-none placeholder:text-muted focus:border-muted"
        autoFocus
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {filtered.map(item => (
          <CommandItem
            key={item.id}
            onSelect={() => {
              handleSelect(item);
            }}
            className="cursor-pointer"
          >
            <div className="flex flex-col">
              <span>{item.title}</span>
              {item.description && (
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              )}
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </>
  );
}
