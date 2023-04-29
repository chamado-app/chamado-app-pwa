require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['prettier', 'import'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
        'newlines-between': 'always'
      }
    ],
    'sort-imports': [
      'error',
      { allowSeparatedGroups: true, ignoreDeclarationSort: true }
    ]
  }
}
