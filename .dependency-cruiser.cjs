/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment:
        "Circular dependencies are forbidden. Break the cycle by extracting shared code or inverting the dependency direction.",
      from: { path: "^app|^lib|^scripts|^tests" },
      to: { circular: true },
    },
    {
      name: "no-circular-at-runtime",
      severity: "error",
      comment:
        "Type-only cycles are allowed; runtime cycles are not. TypeScript types must not leak into runtime imports.",
      from: { path: "^app|^lib|^scripts|^tests" },
      to: {
        circular: true,
        viaOnly: { dependencyTypesNot: ["type-only"] },
      },
    },
    {
      name: "no-orphans",
      severity: "error",
      comment:
        "Files must be referenced by an entry point or another live file. Orphans indicate dead code.",
      from: { path: "^app|^lib|^scripts|^tests", orphan: true },
      to: { path: "^app|^lib|^scripts|^tests" },
    },
    {
      name: "no-deprecated-core-modules",
      severity: "warn",
      comment: "Avoid Node.js deprecated core modules.",
      from: {},
      to: { dependencyTypes: ["deprecated"], path: "^(node:)" },
    },
    {
      name: "no-restricted-paths-from-app-to-db",
      severity: "error",
      comment:
        "App UI (pages, layouts) must not import server-only DB modules directly. Use API routes or server actions.",
      from: { path: "^app/(?!api/).+\\.tsx?$" },
      to: { path: "^lib/db/" },
    },
    {
      name: "no-unknown",
      severity: "warn",
      comment:
        "Unknown / unresolved dependencies should be fixed or explicitly whitelisted.",
      from: {},
      to: { couldNotResolve: true, pathNot: "^(node_modules)" },
    },
  ],
  options: {
    tsConfig: {
      fileName: "tsconfig.json",
    },
    doNotFollow: {
      path: "(node_modules|.next|out|build|dist|coverage)",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
    reporterOptions: {
      text: { highlightFocused: true },
    },
  },
};

module.exports = config;
