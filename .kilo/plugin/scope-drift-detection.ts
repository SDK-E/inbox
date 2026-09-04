import type { Plugin } from "@kilocode/plugin"

const ScopeDriftDetection: Plugin = async ({ client }) => {
  let origin: string | undefined

  return {
    "chat.message": async (_input, output) => {
      if (!origin) {
        const text = output.parts
          .filter((p) => p.type === "text")
          .map((p) => (p as { type: "text"; text: string }).text)
          .join(" ")
          .trim()
        if (text) origin = text.slice(0, 200)
      }
    },
    event: async ({ event }) => {
      if (event.type === "session.created" || event.type === "session.updated") {
        origin = undefined
      }
    },
  }
}

export default { id: "scope-drift-detection", server: ScopeDriftDetection }
