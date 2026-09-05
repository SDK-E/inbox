"use client";

import { cn } from "cn";
import { useState } from "react";

import { Button } from "@inbox/ui/ui/button";
import { ScrollArea } from "@inbox/ui/ui/scroll-area";
import { Separator } from "@inbox/ui/ui/separator";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
}

const messages: Message[] = [
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

export function MessageListPane() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full">
        <div className="flex flex-col">
          {messages.map(message => (
            <MessageRow
              key={message.id}
              message={message}
              isSelected={selectedId === message.id}
              onSelect={() => {
                setSelectedId(message.id);
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function MessageRow({
  message,
  isSelected,
  onSelect,
}: {
  message: Message;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start rounded-none border-0 px-4 py-3 h-auto",
          isSelected && "bg-accent text-accent-foreground",
        )}
        onClick={onSelect}
      >
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
      </Button>
      <Separator />
    </>
  );
}
