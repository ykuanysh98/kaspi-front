import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dotenv/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**'
    ]
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    rules: {
      'vue/block-order': [
        'error',
        {
          'order': ['script', 'template', 'style']
        }
      ],
      'vue/block-lang': 'off',
      'no-useless-escape': 'off',
      'import/default': 'off',
      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', {
        max: 1, maxEOF: 0
      }],
      semi: ['error', 'never'],
      'space-infix-ops': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'no-multi-spaces': ['error'],
      'key-spacing': [
        2,
        {
          'beforeColon': false,
          'afterColon': true
        }
      ],
      indent: ['error', 2, { 'SwitchCase': 1 }],
      'no-trailing-spaces': 'error',
      'padded-blocks': 'off',
      'no-tab': 'off',
      'no-useless-catch': 'off',
      'vue/return-in-computed-property': 'off',
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'multiline': 'never'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1
          },
          multiline: {
            max: 1
          }
        }
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'below'
        }
      ],
      'vue/v-on-event-hyphenation': ['warn', 'never', {
        autofix: true
      }],
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/require-explicit-emits': 'off',
      'vue/no-template-shadow': 'off',
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/html-indent': [
        'error',
        2,
        {
          'attribute': 1,
          'baseIndent': 1,
          'closeBracket': 0,
          'alignAttributesVertically': true,
          'ignores': []
        }
      ],
      'vue/require-default-prop': 'off',
      'no-empty': ['error', { 'allowEmptyCatch': true }],
      'no-dupe-else-if': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-prop-types': 'off',
      'vue/prop-name-casing': 'off'
    }
  }
]
