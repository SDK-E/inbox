"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Logo() {
  return (
    <>
      <Image
        src="/logo-light.png"
        alt="Inbox"
        width={480}
        height={160}
        priority
        className="h-auto w-48 dark:hidden sm:w-56"
      />

      <Image
        src="/logo-dark.png"
        alt="Inbox"
        width={480}
        height={160}
        priority
        className="hidden h-auto w-48 dark:block sm:w-56"
      />
    </>
  );
}

function AuthSection() {
  const { user, loading } = useAuth({ ensureSignedIn: false });
  const router = useRouter();

  if (loading) {
    return <span className="text-xs text-muted-foreground">Loading...</span>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">{user.email}</span>
        <Link
          href="/dashboard"
          className="rounded-md bg-primary px-4 py-2 text-xs text-primary-foreground"
        >
          Open Inbox
        </Link>
        <button
          type="button"
          onClick={() => {
            router.push("/logout");
          }}
          className="text-xs text-muted-foreground underline"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-md bg-primary px-4 py-2 text-xs text-primary-foreground"
    >
      Sign in
    </Link>
  );
}

const features = [
  "Unified inbox",
  "Multiple accounts",
  "IMAP folders",
  "Conversation threads",
  "Search",
  "Contacts",
  "Scheduling",
  "Rules",
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <Logo />
        <AuthSection />
      </header>

      <section className="flex flex-1 items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-5xl">
          <p className="mb-5 text-sm font-medium text-primary">
            Your mail. One place.
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            A faster way to work with email.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Multiple accounts, one inbox, real mailbox folders and the tools
            needed to manage email without jumping between services.
          </p>

          <div className="mt-12 flex max-w-3xl flex-wrap gap-2">
            {features.map(feature => (
              <span
                key={feature}
                className="rounded-md border border-border px-3 py-2 text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-between border-t border-border px-6 py-5 text-xs text-muted-foreground sm:px-10 lg:px-16">
        <span>Inbox</span>
        <span>SDK Enterprises</span>
      </footer>
    </main>
  );
}
