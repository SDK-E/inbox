import type { Plugin } from "@kilocode/plugin";

const AutomaticFinalDiffSelfReview: Plugin = async ({ client }) => {
  const changes = new Map<string, string[]>();

  return {
    event: async ({ event }) => {
      if (
        event.type === "file.watcher.updated" &&
        event.properties.event !== "unlink"
      ) {
        const file = event.properties.file;
        if (!changes.has(file)) changes.set(file, []);
      }
      if (event.type === "session.diff") {
        const diffs = event.properties.diff as Array<{ path?: string }>;
        for (const d of diffs) {
          if (d.path) changes.set(d.path, d.path.split("/"));
        }
        const summary = Array.from(changes.keys()).sort();
        if (summary.length > 0) {
          await client.app.log({
            body: {
              service: "automatic-final-diff-self-review",
              level: "info",
              message: `Self-review diff: ${summary.length} file(s) changed`,
              extra: { files: summary },
            },
          });
        }
        changes.clear();
      }
    },
  };
};

export default {
  id: "automatic-final-diff-self-review",
  server: AutomaticFinalDiffSelfReview,
};
