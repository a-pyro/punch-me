// https://mwskwong.com/blog/enforcing-coding-style-with-vercel-style-guide
// install prettier on the root of the project and dont follow the vercell-style-guide github repo where it says to put the prettier line ` "prettier": "@vercel/style-guide/prettier"` in the package json
const { resolve } = require('node:path')

const project = resolve(__dirname, 'tsconfig.json')

const { JAVASCRIPT_FILES } = require('@vercel/style-guide/eslint/constants')

module.exports = {
  root: true,
  plugins: ['react-native'],
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'plugin:react-native/all',
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-implicit-coercion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: true,
      },
    ],
    // sort import statements
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    // sort named imports within an import statement
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
  },
  overrides: [
    /**
     * JS files are using @babel/eslint-parser, so typed linting doesn't work there.
     * @see {@link https://github.com/vercel/style-guide/blob/canary/eslint/_base.js}
     * @see {@link https://typescript-eslint.io/linting/typed-linting#how-can-i-disable-type-aware-linting-for-a-subset-of-files}
     */
    {
      files: JAVASCRIPT_FILES,
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    // Varies file convention from libraries, e.g. Next.js App Router and Prettier
    // Must use default export
    {
      files: ['*.config.{mjs,ts,js}', 'app/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': ['error', { target: 'any' }],
      },
    },
    // module declarations
    {
      files: ['**/*.d.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react-native/no-raw-text': [
          'error',
          {
            skip: ['ThemedText'],
          },
        ],
      },
    },
  ],
}
