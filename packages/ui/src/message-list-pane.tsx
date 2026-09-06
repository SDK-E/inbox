"use client";

import { cn } from "cn";
import { Mail } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@inbox/ui/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@inbox/ui/ui/empty";
import { ScrollArea } from "@inbox/ui/ui/scroll-area";
import { Separator } from "@inbox/ui/ui/separator";
import { Skeleton } from "@inbox/ui/ui/skeleton";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
}

interface MessageListPaneProps {
  viewport?: "mobile" | "tablet" | "desktop";
  hidden?: boolean;
  selectedId?: string | null;
  onSelectMessage?: (message: Message) => void;
  loading?: boolean;
  error?: string | null;
  messages?: Message[];
}

const defaultMessages: Message[] = [
  {
    id: "1",
    sender: "Alice Johnson",
    subject: "Project Update",
    preview: "Hey, just wanted to give you a quick update on the project...",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    sender: "Bob Smith",
    subject: "Meeting Tomorrow",
    preview: "Don't forget about our meeting tomorrow at 2 PM...",
    time: "9:15 AM",
    unread: true,
  },
  {
    id: "3",
    sender: "Carol White",
    subject: "Invoice #1234",
    preview: "Please find attached the invoice for last month...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    sender: "David Lee",
    subject: "Welcome to the team!",
    preview: "We're excited to have you on board...",
    time: "Yesterday",
    unread: false,
  },
];

export function MessageListPane({
  hidden = false,
  selectedId,
  onSelectMessage,
  loading = false,
  error = null,
  messages = defaultMessages,
}: MessageListPaneProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    null,
  );
  const activeSelectedId = selectedId ?? internalSelectedId;

  const handleSelect = useCallback(
    (message: Message) => {
      if (onSelectMessage) {
        onSelectMessage(message);
      } else {
        setInternalSelectedId(message.id);
      }
    },
    [onSelectMessage],
  );

  if (hidden) {
    return null;
  }

  if (error) {
    return <MessageError error={error} />;
  }

  if (loading) {
    return <MessageLoadingSkeleton />;
  }

  if (messages.length === 0) {
    return <MessageEmpty />;
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <MessageRow
              key={message.id}
              message={message}
              isSelected={activeSelectedId === message.id}
              onSelect={() => {
                handleSelect(message);
              }}
              index={index}
              total={messages.length}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function MessageError({ error }: { error: string }) {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Mail className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Unable to load messages</EmptyTitle>
          <EmptyDescription>{error}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline"
            onClick={() => {
              window.location.reload();
            }}
          >
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

function MessageLoadingSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full">
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function MessageEmpty() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Mail className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>
            Your message list is empty. New messages will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}

function MessageRow({
  message,
  isSelected,
  onSelect,
  index,
  total,
}: {
  message: Message;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
  total: number;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = e.key === "ArrowDown" ? index + 1 : index - 1;
      if (nextIndex >= 0 && nextIndex < total) {
        focusMessageButton(nextIndex);
      }
    }
    if (e.key === "Home") {
      e.preventDefault();
      focusMessageButton(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      focusMessageButton(total - 1);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        data-message-index={index}
        className={cn(
          "w-full justify-start rounded-none border-0 px-4 py-3 h-auto",
          isSelected && "bg-accent text-accent-foreground",
        )}
        onClick={onSelect}
        onKeyDown={handleKeyDown}
      >
        <MessageContent message={message} />
      </Button>
      <Separator />
    </>
  );
}

function MessageContent({ message }: { message: Message }) {
  return (
    <div className="flex w-full items-start justify-between gap-2">
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium truncate",
              message.unread ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {message.sender}
          </span>
          {message.unread && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <div
          className={cn(
            "text-sm truncate",
            message.unread ? "font-medium" : "text-muted-foreground",
          )}
        >
          {message.subject}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {message.preview}
        </div>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">
        {message.time}
      </span>
    </div>
  );
}

function focusMessageButton(index: number): void {
  const selector = `[data-message-index="${String(index)}"]`;
  const button = document.querySelector(selector);
  (button as HTMLButtonElement | null)?.focus();
}
