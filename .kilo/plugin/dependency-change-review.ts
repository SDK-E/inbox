import type { Plugin } from "@kilocode/plugin"

const DependencyChangeReview: Plugin = async ({ client }) => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "write" && input.tool !== "edit") return
      const filePath = typeof output.args === "object" && output.args !== null && "filePath" in output.args
        ? String(output.args.filePath)
        : typeof output.args === "object" && output.args !== null && "path" in output.args
          ? String(output.args.path)
          : ""
      if (!/package\.json$|pnpm-lock\.yaml$/.test(filePath)) return
      const content = typeof output.args === "object" && output.args !== null && "content" in output.args
        ? String(output.args.content)
        : ""
      if (!content) return
      const majorBumps = content.match(/"version"\s*:\s*"\^(\d+)\./g)
      if (majorBumps && majorBumps.length > 0) {
        await client.app.log({
          body: {
            service: "dependency-change-review",
            level: "warn",
            message: "Major version bump detected in dependencies",
            extra: { file: filePath, matches: majorBumps.length, sessionID: input.sessionID },
          },
        })
      }
    },
  }
}

export default { id: "dependency-change-review", server: DependencyChangeReview }
