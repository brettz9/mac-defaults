import ashNazg from 'eslint-config-ash-nazg';

export default /** @type {import('eslint').Linter.Config} */ ([
  {
    ignores: [
      // '.idea',
      'dist',
      'docs/jsdoc'
    ]
  },
  ...ashNazg(['sauron', 'node']),
  {
    files: ['*.md/*.js'],
    languageOptions: {
      globals: {
        mod: 'readonly'
      }
    },
    rules: {
      'import/unambiguous': 0,
      'import/no-unresolved': ['error', {ignore: ['mac-defaults']}],
      'no-console': 0,
      'no-shadow': 0,
      'no-unused-vars': 0
    }
  },
  {
    rules: {
      // Disable for now
      'prefer-named-capture-group': 0,
      'jsdoc/reject-any-type': 0
    }
  }
]);
