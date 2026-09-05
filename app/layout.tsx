import { ThemeProvider } from "@inbox/ui/theme-provider";
import { themeScript } from "@inbox/utils/theme";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { JetBrains_Mono, Inter } from "next/font/google";
import Script from "next/script";

import { RouteAwareShell } from "./route-aware-shell";

import type { Metadata, Viewport } from "next";

import "./globals.css";
import { cn } from "@/packages/ui/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Inbox",
    template: "%s · Inbox",
  },
  description:
    "A fast, unified webmail workspace for managing multiple email accounts.",
  applicationName: "Inbox",
  authors: [{ name: "SDK Enterprises" }],
  creator: "SDK Enterprises",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#081006" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        jetBrainsMono.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <AuthKitProvider>
            <RouteAwareShell>{children}</RouteAwareShell>
          </AuthKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
