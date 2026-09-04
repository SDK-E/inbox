import { spawn } from "node:child_process";

import { chromium } from "@playwright/test";

function main(): void {
  const dev = spawn("pnpm", ["dev"], {
    stdio: ["pipe", "pipe", "pipe"],
    shell: true,
  });

  const errors: string[] = [];

  dev.stdout.on("data", (data: Buffer) => {
    const text = data.toString();
    if (text.includes("Ready")) {
      void runVerification().finally(() => {
        dev.kill("SIGTERM");
      });
    }
  });

  dev.stderr.on("data", (data: Buffer) => {
    errors.push(data.toString());
  });

  dev.on("exit", (code: number | null) => {
    if (code !== null && code !== 0) {
      console.error(`Dev server exited with code ${String(code)}`);
    }
  });

  setTimeout(() => {
    console.error("Dev server did not start within 30s");
    dev.kill("SIGTERM");
    process.exitCode = 1;
  }, 30_000);
}

async function runVerification(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const pageErrors: string[] = [];
  page.on("console", msg => {
    if (msg.type() === "error") {
      pageErrors.push(`console error: ${msg.text()}`);
    }
  });
  page.on("pageerror", err => {
    pageErrors.push(`page error: ${err.message}`);
  });

  try {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForSelector("main", { timeout: 10_000 });
    const title = await page.title();
    if (!title) {
      throw new Error("Page title is empty");
    }

    await page.waitForTimeout(500);

    if (pageErrors.length > 0) {
      throw new Error(`Errors detected:\n${pageErrors.join("\n")}`);
    }

    console.log("Browser verification passed.");
  } catch (error) {
    console.error("Browser verification failed:", error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main();
