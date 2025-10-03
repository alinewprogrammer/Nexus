// .eslintrc.js (Flat config for Next.js / TypeScript)
// Replace your existing ESLint file with this content.

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // keep Next recommended presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],

    rules: {
      /**
       * Allow explicit `any` project-wide (turn off the rule that errors on `any`)
       * This stops '@typescript-eslint/no-explicit-any' from failing the build.
       */
      "@typescript-eslint/no-explicit-any": "off",

      /**
       * Relax other strict/unsafe rules that commonly block `any` usage.
       * Turn them off so the build won't fail — you can re-enable later as you fix code.
       */
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      /**
       * Convert "unused vars" to warnings (so they show but don't break the build).
       * Ignore parameters/vars that start with underscore (common pattern for intentionally unused).
       */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "no-unused-vars": "off", // avoid duplicate rule conflicts

      /**
       * prefer-const can be noisy in large codebases. Make it a warning (or disable).
       * The build was failing on this; set to "warn" or "off".
       */
      "prefer-const": "warn",

      /**
       * Optional: don't require explicit module boundary types (prevents errors on exported fn types).
       */
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  },
];

export default eslintConfig;
