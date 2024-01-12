const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    ecmaVersion: 'latest',
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
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],

    // 'react/no-array-index-key': 'off',
    // '@typescript-eslint/no-misused-promises': 'off',
    // 'import/no-default-export': 'off',
    // 'padding-line-between-statements': [
    //   'warn',
    //   { blankLine: 'always', prev: '*', next: ['return', 'export'] },
    //   { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    //   {
    //     blankLine: 'any',
    //     prev: ['const', 'let', 'var'],
    //     next: ['const', 'let', 'var'],
    //   },
    // ],
    // 'no-console': 'warn',
    // 'react/prop-types': 'off',
    // 'react/jsx-uses-react': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // 'react/self-closing-comp': 'warn',

    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-shadow': 'off',
    // '@typescript-eslint/require-await': 'off',
    // '@typescript-eslint/no-floating-promises': 'off',
    // '@typescript-eslint/no-confusing-void-expression': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'warn',
    //   {
    //     args: 'after-used',
    //     ignoreRestSiblings: false,
    //     argsIgnorePattern: '^_.*?$',
    //   },
    // ],
    // '@next/next/no-img-element': 'off',
    // 'jsx-a11y/no-static-element-interactions': 'off',
    // 'jsx-a11y/click-events-have-key-events': 'off',
  },
};
