import { withAuth } from "@workos-inc/authkit-nextjs";
import { signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-[#d7e8d3] px-6 py-4 dark:border-[#1c3317]">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">
            Inbox
          </Link>
          <nav className="flex gap-4 text-xs text-[#4c5f48] dark:text-[#9bb397]">
            <span className="cursor-pointer">Inbox</span>
            <span className="cursor-pointer">Sent</span>
            <span className="cursor-pointer">Drafts</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-[#4c5f48] dark:text-[#9bb397]">
            {user.email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-xs text-[#4c5f48] underline dark:text-[#9bb397]"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">
            Welcome to your inbox
          </h1>
          <p className="mt-4 text-sm text-[#4c5f48] dark:text-[#9bb397]">
            You are signed in as {user.firstName ? `${user.firstName} ` : ""}
            {user.email}.
          </p>
          <p className="mt-2 text-xs text-[#4c5f48] dark:text-[#9bb397]">
            Connect mail accounts to get started.
          </p>
        </div>
      </section>
    </main>
  );
}
