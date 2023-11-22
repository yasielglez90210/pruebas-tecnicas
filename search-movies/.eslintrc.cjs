module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // './node_modules/standard/eslintrc.json',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    // 'react/jsx-no-target-blank': 'off',
    // 'jsx-quotes': 'off',
    // 'space-before-function-paren': 'off',
    // 'comma-dangle': 'off',
    // 'react/jsx-indent': 'off',
    // indent: 'off',
    // 'array-callback-return': 'off',
  },
}
