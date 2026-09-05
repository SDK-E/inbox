import type { Plugin } from "@kilocode/plugin";

const SkillLoadingEnforcement: Plugin = async ({ client }) => {
  const loaded = new Set<string>();

  return {
    "experimental.chat.system.transform": async (_input, output) => {
      const mandate = [
        "MANDATORY SKILL LOADING — Before answering, planning, editing, or running any command:",
        "1. Call the skill tool to discover all available skills.",
        "2. Determine which skills are relevant to the current task.",
        "3. Load every relevant skill using the skill tool before proceeding.",
        "4. Read each loaded skill's instructions completely before acting.",
        "Do not skip skill loading because the task appears simple, familiar, or urgent.",
      ];
      output.system.unshift(...mandate);
    },
    "chat.message": async (input, output) => {
      if (!loaded.has(input.sessionID ?? "")) {
        const text = output.parts
          .filter(p => p.type === "text")
          .map(p => (p as { type: "text"; text: string }).text)
          .join(" ")
          .trim();
        if (/\bskill/i.test(text) || /\bload/i.test(text)) {
          loaded.add(input.sessionID ?? "");
        }
      }
    },
    event: async ({ event }) => {
      if (
        event.type === "session.created" ||
        event.type === "session.updated"
      ) {
        loaded.delete(event.properties.info.id ?? "");
      }
      if (event.type === "session.idle") {
        const sid = event.properties.sessionID ?? "";
        if (sid && !loaded.has(sid)) {
          await client.app.log({
            body: {
              service: "skill-loading-enforcement",
              level: "warn",
              message: "Session ended without evidence of skill loading",
              extra: { sessionID: sid },
            },
          });
        }
      }
    },
  };
};

export default {
  id: "skill-loading-enforcement",
  server: SkillLoadingEnforcement,
};
