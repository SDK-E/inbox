"use client";

import { cn } from "cn";
import { useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@inbox/ui/ui/resizable";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@inbox/ui/ui/sidebar";

import { AppNavigation } from "./app-navigation";
import { useViewport } from "./hooks/use-viewport";
import { MessageListPane } from "./message-list-pane";
import { ReaderPane } from "./reader-pane";
import { TopBar } from "./top-bar";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
}

interface DesktopShellProps {
  readerVisible: boolean;
  listVisible: boolean;
  selectedMessage: Message | null;
  onSelectMessage: (message: Message) => void;
  onCloseReader: () => void;
  onOpenReader: () => void;
  onToggleList: () => void;
  onMobileNavOpen: () => void;
  mobileNavOpen: boolean;
  settingsOpen?: boolean;
  onSettingsOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function AppShell({
  children,
  settingsOpen,
  onSettingsOpenChange,
  onOpenSettings,
}: {
  children?: React.ReactNode;
  settingsOpen?: boolean;
  onSettingsOpenChange?: (open: boolean) => void;
  onOpenSettings?: () => void;
}) {
  return (
    <SidebarProvider>
      <AppShellInner
        settingsOpen={settingsOpen}
        onSettingsOpenChange={onSettingsOpenChange}
        onOpenSettings={onOpenSettings}
      >
        {children}
      </AppShellInner>
    </SidebarProvider>
  );
}

// eslint-disable-next-line max-lines-per-function
function AppShellInner({
  children,
  settingsOpen,
  onSettingsOpenChange,
  onOpenSettings,
}: {
  children?: React.ReactNode;
  settingsOpen?: boolean;
  onSettingsOpenChange?: (open: boolean) => void;
  onOpenSettings?: () => void;
}) {
  const [readerVisible, setReaderVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });
  const [listVisible, setListVisible] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const sidebar = useSidebar() as {
    setOpenMobile: (open: boolean) => void;
    openMobile: boolean;
  };
  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <SidebarContent>
          <AppNavigation onOpenSettings={onOpenSettings} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <DesktopShell
        readerVisible={readerVisible}
        listVisible={listVisible}
        selectedMessage={selectedMessage}
        onSelectMessage={setSelectedMessage}
        onCloseReader={() => {
          setReaderVisible(false);
        }}
        onOpenReader={() => {
          setReaderVisible(true);
        }}
        onToggleList={() => {
          setListVisible(prev => !prev);
          setReaderVisible(prev => !prev);
        }}
        onMobileNavOpen={() => {
          sidebar.setOpenMobile(true);
        }}
        mobileNavOpen={sidebar.openMobile}
        settingsOpen={settingsOpen}
        onSettingsOpenChange={onSettingsOpenChange}
      >
        {children}
      </DesktopShell>
    </>
  );
}

function DesktopShell({
  readerVisible,
  listVisible,
  selectedMessage,
  onSelectMessage,
  onCloseReader,
  onOpenReader,
  onToggleList,
  onMobileNavOpen,
  mobileNavOpen,
  settingsOpen,
  onSettingsOpenChange,
  children,
}: DesktopShellProps) {
  const viewport = useViewport();
  const isMobile = viewport === "mobile";
  const showList = isMobile ? listVisible : true;
  const showReader = readerVisible;

  return (
    <div
      className={cn(
        "flex h-screen flex-col overflow-hidden w-full transition-transform duration-200 ease-linear motion-reduce:transition-none",
        isMobile && mobileNavOpen && "translate-x-64",
      )}
    >
      <TopBar
        onMobileNavOpen={onMobileNavOpen}
        onCloseReader={onCloseReader}
        onOpenReader={onOpenReader}
        readerVisible={readerVisible}
        listVisible={listVisible}
        onToggleList={onToggleList}
        viewport={viewport}
        settingsOpen={settingsOpen}
        onSettingsOpenChange={onSettingsOpenChange}
      />
      <MainArea
        showList={showList}
        showReader={showReader}
        selectedMessage={selectedMessage}
        onSelectMessage={onSelectMessage}
        children={children}
      />
    </div>
  );
}

function MainArea({
  showList,
  showReader,
  selectedMessage,
  onSelectMessage,
  children,
}: {
  showList: boolean;
  showReader: boolean;
  selectedMessage: Message | null;
  onSelectMessage: (message: Message) => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-1 overflow-hidden"
      role="main"
      aria-label="Main content"
    >
      <ResizablePanelGroup orientation="horizontal" className="h-full">
        {showList && (
          <ResizablePanel defaultSize={18} minSize={15}>
            <MessageListPanel
              selectedMessage={selectedMessage}
              onSelectMessage={onSelectMessage}
              showList={showList}
            />
          </ResizablePanel>
        )}
        {showList && showReader && <ResizableHandle withHandle />}
        {showReader && (
          <ReaderPanel selectedMessage={selectedMessage}>
            {children}
          </ReaderPanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

function MessageListPanel({
  selectedMessage,
  onSelectMessage,
  showList,
}: {
  selectedMessage: Message | null;
  onSelectMessage: (message: Message) => void;
  showList: boolean;
}) {
  const selectedId = selectedMessage ? selectedMessage.id : null;

  return (
    <div
      className="h-full border-r border-border"
      role="complementary"
      aria-label="Message list"
    >
      <MessageListPane
        hidden={!showList}
        selectedId={selectedId}
        onSelectMessage={onSelectMessage}
      />
    </div>
  );
}

function ReaderPanel({
  selectedMessage,
  children,
}: {
  selectedMessage: Message | null;
  children?: React.ReactNode;
}) {
  return (
    <ResizablePanel defaultSize={55} minSize={40}>
      <div className="h-full">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-sm font-medium">Reader</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {selectedMessage ? (
              <ReaderPane message={selectedMessage} />
            ) : (
              (children ?? <ReaderPane />)
            )}
          </div>
        </div>
      </div>
    </ResizablePanel>
  );
}
