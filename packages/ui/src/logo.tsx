import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <Image
        src="/logo-light.png"
        alt="Inbox"
        width={480}
        height={160}
        priority
        className={`h-auto w-24 dark:hidden sm:w-28 ${className}`}
      />
      <Image
        src="/logo-dark.png"
        alt="Inbox"
        width={480}
        height={160}
        priority
        className={`hidden h-auto w-24 dark:block sm:w-28 ${className}`}
      />
    </>
  );
}
