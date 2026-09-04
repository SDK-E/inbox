import type { Plugin } from "@kilocode/plugin"

const MigrationSchemaReview: Plugin = async ({ client }) => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "write" && input.tool !== "edit") return
      const filePath = typeof output.args === "object" && output.args !== null && "filePath" in output.args
        ? String(output.args.filePath)
        : typeof output.args === "object" && output.args !== null && "path" in output.args
          ? String(output.args.path)
          : ""
      if (!/drizzle\/(migrations|schema)|lib\/db\//.test(filePath)) return
      const content = typeof output.args === "object" && output.args !== null && "content" in output.args
        ? String(output.args.content)
        : ""
      if (!content) return
      const hasInvalidName = /CREATE TABLE/i.test(content) && !filePath.includes("0000")
      if (hasInvalidName) {
        await client.app.log({
          body: {
            service: "migration-schema-review",
            level: "warn",
            message: "Direct CREATE TABLE in migration file detected",
            extra: { file: filePath, sessionID: input.sessionID },
          },
        })
      }
    },
  }
}

export default { id: "migration-schema-review", server: MigrationSchemaReview }
