import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/.github",
      "**/.husky",
      "**/.licenses",
      "**/.vscode",
      "**/dist",
      "**/node_modules",
      "eslint.config.js",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      importPlugin.flatConfigs?.recommended,
      eslintConfigPrettier,
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "jsx-ally": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      // Note: this isn't needed if using TS and applying the `verbatimModuleSyntax` property
      // "@typescript-eslint/consistent-type-imports": [
      //   "error",
      //   {
      //     disallowTypeAnnotations: false,
      //     fixStyle: "inline-type-imports",
      //     prefer: "type-imports",
      //   },
      // ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "warn",
        { allowInterfaces: "always" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@mui/icons-material/*"],
              message:
                "For parity, use the named export from Material icons. Rollup is able to tree shake unused icons from this top-level import.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          alwaysTryTypes: true, // optional, but helps with index files
        },
      },
      // Note: use alias resolver for any non‑TS imports or alternate mappings — IF NEEDED
      // alias: {
      //   map: [
      //     // make sure this path is absolute or correctly resolved
      //     ["~", path.resolve(__dirname, "src")],
      //   ],
      //   extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts", ".json"],
      // },
      react: { version: "detect" },
    },
  },
  {
    extends: [...storybook.configs["flat/recommended"]],
    files: ["**/*.stories.{ts|tsx}"],
  },
);
