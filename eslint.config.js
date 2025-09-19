import stylistic from '@stylistic/eslint-plugin'
import tsdoc from 'eslint-plugin-tsdoc'
import neostandard from 'neostandard'

export default [
  {
    ignores: ['**/.astro/**', '**/dist/**'],
  },
  ...neostandard({
    ts: true,
  }),
  {
    plugins: {
      '@stylistic': stylistic,
      tsdoc,
    },
    rules: {
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-curly-newline': 'off',
      'tsdoc/syntax': 'warn',
    },
  },
]
