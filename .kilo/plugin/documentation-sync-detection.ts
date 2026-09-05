import type { Plugin } from "@kilocode/plugin";

const DocumentationSyncDetection: Plugin = async ({ client }) => {
  const docRoots = ["docs/", "README.md", "CLAUDE.md", "AGENTS.md", ".kilo/"];
  const codeExtensions = [".ts", ".tsx", ".js", ".jsx", ".mjs"];

  return {
    event: async ({ event }) => {
      if (event.type !== "file.edited" && event.type !== "file.watcher.updated")
        return;
      const file = event.properties.file;
      if (!codeExtensions.some(ext => file.endsWith(ext))) return;
      if (docRoots.some(root => file.startsWith(root))) return;
      const docCandidates = docRoots.flatMap(root => [
        root,
        `${root}${
          file
            .split("/")
            .pop()
            ?.replace(/\.[^.]+$/, ".md") ?? ""
        }`,
      ]);
      const hasDocUpdate = docCandidates.some(doc => file !== doc);
      if (!hasDocUpdate) {
        await client.app.log({
          body: {
            service: "documentation-sync-detection",
            level: "warn",
            message: "Code changed without corresponding documentation update",
            extra: { file },
          },
        });
      }
    },
  };
};

export default {
  id: "documentation-sync-detection",
  server: DocumentationSyncDetection,
};
