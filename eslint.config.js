// eslint.config.js (ESLint Flat Config, ESM)
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  vue.configs['flat/recommended'],

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
  {
    rules: {
      'prettier/prettier': 'off',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
])
