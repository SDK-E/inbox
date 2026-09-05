import type { Plugin } from "@kilocode/plugin";

const DiagnosticsErrorTracking: Plugin = async ({ client }) => {
  const errors = new Map<string, number>();

  return {
    event: async ({ event }) => {
      if (event.type === "lsp.client.diagnostics") {
        const path = event.properties.path as string;
        errors.set(path, (errors.get(path) ?? 0) + 1);
        if ((errors.get(path) ?? 0) > 5) {
          await client.app.log({
            body: {
              service: "diagnostics-error-tracking",
              level: "error",
              message: "Repeated LSP diagnostics on file",
              extra: { file: path, count: errors.get(path) },
            },
          });
        }
      }
      if (event.type === "session.error") {
        const err = event.properties.error;
        await client.app.log({
          body: {
            service: "diagnostics-error-tracking",
            level: "error",
            message: "Session error",
            extra: { sessionID: event.properties.sessionID, error: err },
          },
        });
      }
    },
  };
};

export default {
  id: "diagnostics-error-tracking",
  server: DiagnosticsErrorTracking,
};
