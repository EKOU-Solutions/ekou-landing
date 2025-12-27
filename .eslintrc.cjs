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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'standard',
    'plugin:astro/recommended',
    'prettier'
  ],
  plugins: ['astro'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    {
      files: ['**/*.{js,jsx}'],
      extends: [
        'standard',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier'
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.astro/'
  ]
}


