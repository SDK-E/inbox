import type { Plugin } from "@kilocode/plugin";

const UIChangeBrowserVerification: Plugin = async ({ client, $ }) => {
  const uiPatterns = [
    /\/app\//,
    /\/components\//,
    /page\.tsx$/,
    /layout\.tsx$/,
  ];

  return {
    event: async ({ event }) => {
      if (
        event.type === "file.edited" ||
        event.type === "file.watcher.updated"
      ) {
        const file = event.properties.file;
        if (uiPatterns.some(p => p.test(file))) {
          await client.app.log({
            body: {
              service: "ui-change-browser-verification",
              level: "info",
              message: `UI change detected: ${file}`,
              extra: { file },
            },
          });
          try {
            await $`pnpm verify`;
          } catch {
            await client.app.log({
              body: {
                service: "ui-change-browser-verification",
                level: "warn",
                message: "Browser verification failed for UI change",
                extra: { file },
              },
            });
          }
        }
      }
    },
  };
};

export default {
  id: "ui-change-browser-verification",
  server: UIChangeBrowserVerification,
};
