import next from "@next/eslint-plugin-next";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  ts.configs.recommended,
  next.configs.recommended,
  {
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  }
];
