import { execFileSync } from "node:child_process";

const DEFAULT_TARGETS = ["app", "scripts", "tests"];

function main(): void {
  const args = process.argv.slice(2);
  const hasPositionalTarget = args.some(
    a => !a.startsWith("-") && !DEFAULT_TARGETS.includes(a),
  );
  const targets =
    hasPositionalTarget || args.length === 0
      ? args
      : ["--validate", ...DEFAULT_TARGETS];
  try {
    const stdout = execFileSync("npx", ["depcruise", ...targets], {
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
    console.error(`module-graph: depcruise failed: ${e.message}`);
    process.exitCode = 1;
  }
}

main();
