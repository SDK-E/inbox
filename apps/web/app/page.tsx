import Image from "next/image";

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <Logo />

        <span className="text-xs text-[#4c5f48] dark:text-[#9bb397]">
          by SDK Enterprises
        </span>
      </header>

      <section className="flex flex-1 items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-5xl">
          <p className="mb-5 text-sm font-medium text-[#239f14] dark:text-[#2cdb16]">
            Your mail. One place.
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            A faster way to work with email.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#4c5f48] dark:text-[#9bb397] sm:text-lg">
            Multiple accounts, one inbox, real mailbox folders and the tools
            needed to manage email without jumping between services.
          </p>

          <div className="mt-12 flex max-w-3xl flex-wrap gap-2">
            {features.map(feature => (
              <span
                key={feature}
                className="rounded-md border border-[#d7e8d3] px-3 py-2 text-xs dark:border-[#1c3317]"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-between border-t border-[#d7e8d3] px-6 py-5 text-xs text-[#4c5f48] dark:border-[#1c3317] dark:text-[#9bb397] sm:px-10 lg:px-16">
        <span>Inbox</span>
        <span>SDK Enterprises</span>
      </footer>
    </main>
  );
}
