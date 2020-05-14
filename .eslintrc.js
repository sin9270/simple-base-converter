module.exports = {
  plugins: ["node", "prettier", "@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  env: {
    es6: true,
    "jest/globals": true,
  },
};
