import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**', '.angular/**'],
  },

  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@angular-eslint': angular.tsPlugin,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      'no-undef': 'off',

      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          singleQuote: true,
          semi: true,
        },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'padded-blocks': ['error', { classes: 'always' }],

      'object-curly-spacing': ['warn', 'always'],

      'template-curly-spacing': ['warn', 'always'],

      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

      
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            properties: 'no-public',
            methods: 'no-public',
            parameterProperties: 'no-public',
          },
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'objectLiteralProperty',
          format: null,
        },
        {
          selector: 'typeProperty',
          format: null,
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],

      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angular.templatePlugin,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: angular.templateParser,
    },
    rules: {
      ...angular.configs.templateRecommended.rules,
      ...angular.configs.templateAccessibility.rules,

      'prettier/prettier': [
        'error',
        {
          parser: 'html',
          tabWidth: 2,
        },
      ],

      '@angular-eslint/template/banana-in-box': 'error',

      '@angular-eslint/template/eqeqeq': 'warn',

      '@angular-eslint/template/no-duplicate-attributes': 'error',

      ...eslintConfigPrettier.rules,
    },
  },
]);