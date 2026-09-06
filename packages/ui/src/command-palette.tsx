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
  search?: string;
  onSearchChange?: (search: string) => void;
  items?: CommandPaletteItem[];
}

export function CommandPalette({
  open,
  onOpenChange,
  search = "",
  onSearchChange,
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
      <CommandPaletteContent
        items={items}
        onOpenChange={onOpenChange}
        search={search}
        onSearchChange={onSearchChange}
      />
    </CommandDialog>
  );
}

function CommandPaletteContent({
  items,
  onOpenChange,
  search,
  onSearchChange,
}: {
  items: CommandPaletteItem[];
  onOpenChange: (open: boolean) => void;
  search: string;
  onSearchChange?: (search: string) => void;
}) {
  const [internalSearch, setInternalSearch] = React.useState("");
  const activeSearch = search || internalSearch;
  const setActiveSearch = onSearchChange || setInternalSearch;

  const filtered = React.useMemo(() => {
    const trimmed = activeSearch.trim().toLowerCase();
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
  }, [activeSearch, items]);

  const handleSelect = (item: CommandPaletteItem) => {
    setActiveSearch("");
    onOpenChange(false);
    item.action?.();
  };

  return (
    <CommandPaletteItems
      items={filtered}
      onSelect={handleSelect}
      activeSearch={activeSearch}
      setActiveSearch={setActiveSearch}
    />
  );
}

function CommandPaletteItems({
  items,
  onSelect,
  activeSearch,
  setActiveSearch,
}: {
  items: CommandPaletteItem[];
  onSelect: (item: CommandPaletteItem) => void;
  activeSearch: string;
  setActiveSearch: (search: string) => void;
}) {
  return (
    <>
      <CommandInput
        value={activeSearch}
        onValueChange={setActiveSearch}
        placeholder="Search mail, threads, contacts, settings..."
        className="flex-1 border-0 border-b border-transparent bg-transparent text-sm outline-none placeholder:text-muted focus:border-muted"
        autoFocus
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {items.map(item => (
          <CommandItem
            key={item.id}
            onSelect={() => {
              onSelect(item);
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
