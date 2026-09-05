"use client";

import { Mail, X } from "lucide-react";
import { Moon, Sun, SunMoon } from "lucide-react";

import { Button } from "@inbox/ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@inbox/ui/ui/dropdown-menu";

import { useTheme } from "./theme-provider";

interface TopBarProps {
  onCommandOpen?: () => void;
  onMobileNavOpen: () => void;
  onCloseReader?: () => void;
  onOpenReader?: () => void;
  readerVisible?: boolean;
}

export function TopBar({
  onCommandOpen,
  onMobileNavOpen,
  onCloseReader,
  onOpenReader,
  readerVisible,
}: TopBarProps) {
  return (
    <header className="flex h-12 items-center justify-between gap-2 border-b border-border bg-surface px-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMobileNavOpen}
          aria-label="Open navigation"
          className="lg:hidden rounded p-1.5 text-muted-foreground hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="sr-only">Open navigation</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <SearchInput onFocus={onCommandOpen} />
      </div>

      <div className="flex items-center gap-1">
        {!readerVisible && onOpenReader && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onOpenReader}
            aria-label="Open reader"
          >
            <Mail className="h-4 w-4" />
          </Button>
        )}
        {readerVisible && onCloseReader && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onCloseReader}
            aria-label="Close reader"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <ThemeMenu />
      </div>
    </header>
  );
}

function SearchInput({ onFocus }: { onFocus?: () => void }) {
  return (
    <div className="relative hidden sm:block">
      <input
        type="search"
        placeholder="Search mail..."
        className="h-8 w-48 rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring sm:w-64"
        onFocus={onFocus}
      />
    </div>
  );
}

function ThemeMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Toggle theme" />
        }
      >
        {theme === "system" ? (
          <SunMoon className="h-4 w-4" />
        ) : theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
