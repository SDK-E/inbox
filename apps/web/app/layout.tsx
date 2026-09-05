import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { JetBrains_Mono } from "next/font/google";

import type { Metadata, Viewport } from "next";

import "./globals.css";

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
    <html lang="en" className={`${jetBrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#082003] dark:bg-[#081006] dark:text-[#f2f8f0]">
        <AuthKitProvider>{children}</AuthKitProvider>
      </body>
    </html>
  );
}
