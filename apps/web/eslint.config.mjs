import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "next-env.d.ts",
    "drizzle/migrations/**",
    "node_modules/**",
    ".agents/**",
    ".claude/**",
    ".kilocode/**",
    ".kiro/**",
    ".kilo/**",
    ".kilo/skills/**",
    ".qwen/**",
    "skills-lock.json",
    ".dependency-cruiser.cjs",
    "repomix.config.json",
    "repomix-output.md",
  ]),

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // TypeScript: parser, recommended, strict, and type-aware rules
  ...tseslint.configs.strictTypeChecked,

  // Enable type-aware linting with project reference
  {
    name: "typescript-eslint/type-aware",
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Node.js globals for server-side and configuration files
  {
    name: "globals/node",
    files: [
      "lib/**",
      "app/api/**",
      "app/**/route.ts",
      "*.config.*",
      "drizzle.config.ts",
    ],
    languageOptions: { globals: { ...globals.node, ...globals.es2024 } },
  },

  // Import ordering, cycles, and boundary restrictions
  {
    name: "imports",
    files: ["**/*.{ts,tsx}"],
    plugins: { "import-x": importPlugin },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            { pattern: "@/**", group: "internal", position: "before" },
          ],
        },
      ],
      "import-x/no-cycle": ["warn", { maxDepth: 1 }],
      "import-x/no-relative-parent-imports": "error",
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: ["./app/**"],
              from: ["./lib/db/**", "@/lib/db/**"],
              message:
                "App code must not import server-only database modules directly. " +
                "Use server actions or API routes instead.",
            },
          ],
        },
      ],
    },
  },

  // Allow API routes to import server-only database modules
  {
    name: "imports:allow-db-in-api",
    files: ["app/api/**"],
    rules: {
      "import-x/no-restricted-paths": "off",
    },
  },

  // Unused imports and exports with autofix
  {
    name: "unused-imports",
    plugins: { "unused-imports": unusedImports },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // SonarJS: cognitive complexity
  {
    name: "sonarjs",
    files: ["**/*.{ts,tsx}"],
    plugins: { sonarjs },
    rules: {
      "sonarjs/cognitive-complexity": ["error", 12],
    },
  },

  // Complexity and size limits
  {
    name: "complexity",
    files: ["**/*.{ts,tsx}"],
    rules: {
      complexity: ["error", 10],
      "max-lines": ["error", 400],
      "max-lines-per-function": [
        "error",
        { max: 60, skipComments: true, skipBlankLines: true },
      ],
      "max-params": ["error", 4],
      "max-depth": ["error", 3],
      "max-statements": ["error", 20],
      "max-statements-per-line": ["error", { max: 1 }],
      "max-nested-callbacks": ["error", 3],
      "max-classes-per-file": ["error", 1],
    },
  },

  // TypeScript strictness — no unsafe patterns, no non-null assertions
  {
    name: "typescript-strict",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      eqeqeq: ["error", "always"],
      "no-eq-null": "error",
    },
  },

  // Unicorn: curated subset of clean-code rules
  {
    name: "unicorn",
    files: ["**/*.{ts,tsx}"],
    plugins: { unicorn },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          cases: { kebabCase: true },
          ignore: [/^[A-Z].*$/, "README.md"],
        },
      ],
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/prefer-array-flat": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/no-array-for-each": "warn",
      "unicorn/consistent-function-scoping": "warn",
    },
  },

  // Configuration files: disable type-aware linting, relax size limits
  {
    name: "config-files",
    files: [
      "*.config.mjs",
      "*.config.ts",
      "drizzle.config.ts",
      "next.config.ts",
    ],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "max-lines": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Test files: disable type-aware linting, relax complexity and size limits
  {
    name: "tests",
    files: ["tests/**", "**/*.test.ts", "**/*.spec.ts"],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "max-lines-per-function": "off",
      "max-lines": "off",
      complexity: "off",
      "sonarjs/cognitive-complexity": "off",
      "max-statements": "off",
      "max-params": "off",
      "max-depth": "off",
      "max-nested-callbacks": "off",
      "max-classes-per-file": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "unicorn/no-array-for-each": "off",
    },
  },

  // Prettier compatibility — must come last
  prettier,
]);
