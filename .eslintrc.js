module.exports = {
  plugins: ["node", "@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
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
