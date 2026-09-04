import type { Plugin } from "@kilocode/plugin"

const CompletionVerificationGate: Plugin = async ({ client }) => {
  const verified = new Set<string>()

  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        if (verified.size === 0) {
          await client.app.log({
            body: {
              service: "completion-verification-gate",
              level: "warn",
              message: "Session ended without required verification",
              extra: { sessionID: event.properties.sessionID },
            },
          })
        }
      }
    },
    "tool.execute.after": async (input, _output) => {
      if (input.tool === "bash" && typeof input.args === "object" && input.args !== null && "command" in input.args) {
        const cmd = String(input.args.command)
        if (/\b(pnpm (check|test|build|verify))\b/.test(cmd)) {
          verified.add(input.sessionID)
        }
      }
    },
    "tool.execute.before": async (input, output) => {
      if (input.tool === "bash" && typeof output.args === "object" && output.args !== null && "command" in output.args) {
        const cmd = String(output.args.command)
        if (/\b(git commit|git push|next build|pnpm build)\b/.test(cmd) && !verified.has(input.sessionID)) {
          await client.app.log({
            body: {
              service: "completion-verification-gate",
              level: "warn",
              message: "Blocked completion action without prior verification",
              extra: { sessionID: input.sessionID, command: cmd },
            },
          })
          throw new Error("Run required verification (pnpm check, pnpm test) before completing")
        }
      }
    },
    "permission.ask": async (input, output) => {
      const patterns = Array.isArray(input.pattern) ? input.pattern : input.pattern ? [input.pattern] : []
      if (patterns.some((p: string) => /\.(env|key|secret|pem)$/.test(p))) {
        output.status = "deny"
      }
    },
  }
}

export default { id: "completion-verification-gate", server: CompletionVerificationGate }
