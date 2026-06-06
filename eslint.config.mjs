import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // FlatCompat правильно адаптирует старые плагины под новый формат
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Аналог твоего globalIgnores, пишется прямо в объекте настроек
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
