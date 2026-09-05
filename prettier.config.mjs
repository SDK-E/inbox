const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "lf",
  overrides: [
    {
      files: ["*.md"],
      printWidth: 150,
    },
  ],
};

export default config;
