"use client";

import { ScrollArea } from "@inbox/ui/ui/scroll-area";
import { Separator } from "@inbox/ui/ui/separator";

interface ReaderPaneProps {
  message?: {
    sender: string;
    subject: string;
    preview: string;
    time: string;
  } | null;
}

export function ReaderPane({ message }: ReaderPaneProps) {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto p-6">
          {message ? <SelectedMessage message={message} /> : <WelcomeState />}
        </div>
      </ScrollArea>
    </div>
  );
}

function SelectedMessage({
  message,
}: {
  message: {
    sender: string;
    subject: string;
    preview: string;
    time: string;
  };
}) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">{message.subject}</h1>
        <p className="text-sm text-muted-foreground">From: {message.sender}</p>
        <p className="text-sm text-muted-foreground">{message.time}</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{message.preview}</p>
      </div>
    </>
  );
}

function WelcomeState() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Welcome to Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Your fast, unified webmail workspace for managing multiple email
          accounts.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select a message from the list to read it here. This is your reader
          pane where you can view the full content of your emails.
        </p>

        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-lg font-medium mb-2">Getting Started</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Inbox helps you manage multiple email accounts in one place. Use the
            sidebar to navigate between folders, and the command palette (Cmd+K
            or Ctrl+K) to quickly find what you need.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">Organize with folders and labels</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">Search across all your accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">
                Switch between light and dark themes
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
