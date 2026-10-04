import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // --- 1. НАСТРОЙКИ ДЛЯ TYPESCRIPT (*.ts) ---
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    processor: angular.processInlineTemplates,
    rules: {
      // Подключение форматирования Prettier внутри ESLint
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          semi: true,
        },
      ],

      // --- ПРАВИЛА ИЗ ТЗ ДЛЯ TS ---
      // 1. Обязательные одинарные кавычки
      'quotes': ['error', 'single', { avoidEscape: true }],

      // 2. Обязательные точки с запятой
      'semi': ['error', 'always'],

      // 3. Отступы ровно 2 пробела
      'indent': ['error', 2, { SwitchCase: 1 }],

      // 4. Ограничение длины строки (100 символов)
      'max-len': ['warn', { code: 100, ignoreUrls: true, ignoreComments: true }],

      // 5. Пробелы внутри фигурных скобок: { foo: bar }
      'object-curly-spacing': ['error', 'always'],

      // 6. Запрет console.log (разрешены console.warn и console.error)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // 7. Стили именования (naming-convention)
      '@typescript-eslint/naming-convention': [
        'error',
        // Интерфейсы начинаются с 'I' (IPassword, IUserProfile)
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        // Энумы в PascalCase
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        // Члены энумов в UPPER_CASE
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],

      // 8. Явное указание модификаторов доступа (запрет явного public)
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            methods: 'no-public',
            properties: 'no-public',
            parameterProperties: 'explicit',
          },
        },
      ],

      // 9. Ограничение функций/методов по длине
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
    },
  },

  // --- 2. НАСТРОЙКИ ДЛЯ HTML-ШАБЛОНОВ ANGULAR (*.html) ---
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintConfigPrettier,
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'html',
          tabWidth: 2,
        },
      ],

      // 10. "Банан в коробке" [(ngModel)] (error)
      '@angular-eslint/template/banana-in-box': 'error',

      // 11. Строгое сравнение === вместо == (warn)
      '@angular-eslint/template/eqeqeq': 'warn',

      // 12. Валидация элементов и закрытия тегов (error)
      '@angular-eslint/template/elements-content': 'error',
    },
  }
);