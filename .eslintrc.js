module.exports = {
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    before: 'readonly',
    beforeEach: 'readonly',
    after: 'readonly',
    afterEach: 'readonly',
    expect: 'readonly',
    cy: 'readonly',
    Cypress: 'readonly',
  },
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
