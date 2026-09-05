import type { Plugin } from "@kilocode/plugin";

const SecuritySensitiveChangeReview: Plugin = async ({ client }) => {
  const sensitivePatterns = [
    /\.env$/,
    /\.env\./,
    /server-only/,
    /auth/,
    /secret/,
    /credential/,
    /drizzle\/schema/,
    /middleware/,
    /lib\/env\.ts$/,
  ];

  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "write" && input.tool !== "edit") return;
      const filePath =
        typeof output.args === "object" &&
        output.args !== null &&
        "filePath" in output.args
          ? String(output.args.filePath)
          : typeof output.args === "object" &&
              output.args !== null &&
              "path" in output.args
            ? String(output.args.path)
            : "";
      if (!filePath) return;
      if (sensitivePatterns.some(p => p.test(filePath))) {
        await client.app.log({
          body: {
            service: "security-sensitive-change-review",
            level: "warn",
            message: `Sensitive file modified: ${filePath}`,
            extra: {
              file: filePath,
              tool: input.tool,
              sessionID: input.sessionID,
            },
          },
        });
      }
    },
  };
};

export default {
  id: "security-sensitive-change-review",
  server: SecuritySensitiveChangeReview,
};
