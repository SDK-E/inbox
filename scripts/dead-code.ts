import { execFileSync } from "node:child_process";

function main(): void {
  const args = process.argv.slice(2);
  try {
    const stdout = execFileSync("npx", ["knip", ...args], {
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 64 * 1024 * 1024,
    });
    process.stdout.write(stdout);
  } catch (error) {
    const e = error as NodeJS.ErrnoException & {
      stdout?: Buffer;
      stderr?: Buffer;
    };
    if (e.stdout) {
      process.stdout.write(e.stdout);
    }
    if (e.stderr) {
      process.stderr.write(e.stderr);
    }
    console.error(`dead-code: knip failed: ${e.message}`);
    process.exitCode = 1;
  }
}

main();
