"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@inbox/ui/ui/avatar";
import { Button } from "@inbox/ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@inbox/ui/ui/dropdown-menu";

interface UserMenuUser {
  email: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  profilePictureUrl?: string | null;
}

function UserMenuContent({ user }: { user: UserMenuUser }) {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {(user.name ??
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()) ||
                user.email}
            </span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-surface-muted focus:bg-surface-muted focus:outline-none"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-surface-muted focus:bg-surface-muted focus:outline-none"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <Link
          href="/logout"
          className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-surface-muted hover:text-foreground focus:bg-surface-muted focus:outline-none"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
}

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth({ ensureSignedIn: false });

  if (!user) {
    return null;
  }

  const userData = user as UserMenuUser;
  const initials = getInitials(userData);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="User menu"
            className="flex items-center gap-2 rounded-md p-1 text-muted-foreground hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          />
        }
      >
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={userData.profilePictureUrl ?? undefined}
            alt={userData.name ?? userData.email}
          />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border border-border bg-surface text-foreground shadow-lg"
      >
        <UserMenuContent user={userData} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getInitials(user: UserMenuUser): string {
  const name = getDisplayName(user);
  if (!name) {
    return getFirstChar(user.email) ?? "U";
  }

  const parts = name.split(" ");
  const first = getFirstChar(parts[0]) ?? "";
  const second =
    parts.length > 1 ? (getFirstChar(parts[parts.length - 1]) ?? "") : "";
  const initials = (first + second).toUpperCase();

  return (initials || getFirstChar(user.email)) ?? "U";
}

function getDisplayName(user: UserMenuUser): string {
  return user.name ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
}

function getFirstChar(value: string | null | undefined): string | undefined {
  return value?.[0];
}
