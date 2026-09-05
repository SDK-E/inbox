"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@inbox/ui/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@inbox/ui/ui/resizable";
import { Separator } from "@inbox/ui/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarRail,
} from "@inbox/ui/ui/sidebar";

import { AppNavigation } from "./app-navigation";
import { MessageListPane } from "./message-list-pane";
import { ReaderPane } from "./reader-pane";
import { TopBar } from "./top-bar";

export function AppShell({ children }: { children?: React.ReactNode }) {
  const [readerVisible, setReaderVisible] = useState(true);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border">
        <SidebarContent>
          <AppNavigation />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <DesktopShell
        readerVisible={readerVisible}
        onCloseReader={() => {
          setReaderVisible(false);
        }}
        onOpenReader={() => {
          setReaderVisible(true);
        }}
      >
        {children}
      </DesktopShell>
    </SidebarProvider>
  );
}

function DesktopShell({
  readerVisible,
  onCloseReader,
  onOpenReader,
  children,
}: {
  readerVisible: boolean;
  onCloseReader: () => void;
  onOpenReader: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar
        onMobileNavOpen={() => {
          return undefined;
        }}
        onCloseReader={onCloseReader}
        onOpenReader={onOpenReader}
        readerVisible={readerVisible}
      />
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full">
          <ResizablePanel defaultSize={18} minSize={15}>
            <div className="h-full border-r border-border">
              <MessageListPane />
            </div>
          </ResizablePanel>
          <Separator orientation="vertical" className="h-full w-px bg-border" />
          {readerVisible && (
            <>
              <ResizablePanel defaultSize={55} minSize={40}>
                <div className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-border px-4 py-2">
                      <span className="text-sm font-medium">Reader</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          onCloseReader();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      {children ?? <ReaderPane />}
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
