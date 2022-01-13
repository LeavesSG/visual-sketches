module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console":
      process.env.NODE_ENV === "production"
        ? ["error", { allow: ["warn", "error", "info"] }]
        : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-duplicate-imports": "error",
    "no-dupe-class-members": "off",
    "prefer-rest-params": "off",
    "prefer-spread": "off",
    "no-eval": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
  },
  parserOptions: {
    sourceType: "module",
    impliedStrict: true,
  },
};
