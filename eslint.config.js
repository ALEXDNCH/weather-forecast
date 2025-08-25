// eslint.config.js
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tseslint from "typescript-eslint";
// import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // игнор
  { ignores: ["dist", "node_modules"] },

  // базовый js конфиг
  js.configs.recommended,

  // typescript-eslint
  ...tseslint.configs.recommended,

  // vue 3
  ...vue.configs["flat/recommended"],

  // для .vue файлов
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      // globals: { ...globals.browser, ...globals.es2021 },
    },
    rules: {
      "vue/multi-word-component-names": "off", // не ругаться на App.vue
    },
  },

  // TS файлы
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      // globals: { ...globals.browser, ...globals.es2021 },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // prettier интеграция
  eslintConfigPrettier,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
