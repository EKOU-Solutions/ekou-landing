/*
StandardJS for JS/JSX

Recommended Astro rules for .astro

Recommended React/Hooks/A11y rules for JSX
*/

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    "standard",
    "plugin:astro/recommended"
  ],
  plugins: ["astro"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@babel/eslint-parser",
        requireConfigFile: false
      }
    },
    {
      files: ["**/*.{js,jsx}"],
      extends: [
        "standard",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended"
      ],
      settings: {
        react: { version: "detect" }
      }
    }
  ],
  ignorePatterns: [
    "dist/",
    ".astro/",
    "node_modules/"
  ]
}

