module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-constant-condition': ['off'],
    'no-useless-rename': ['warn'],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useAsync|useAsyncCached|useThrottle|useDebounce)',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parserOptions: {
        ecmaVersion: 2020,
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:storybook/recommended',
      ],
      rules: {
        'no-constant-condition': ['off'],
        '@typescript-eslint/no-explicit-any': ['warn'],
        '@typescript-eslint/no-floating-promises': ['warn'], // requires parserOptions.project
      },
    },
  ],
}
