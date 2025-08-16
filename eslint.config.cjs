const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const lit = require('eslint-plugin-lit');
const wc = require('eslint-plugin-wc');
const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-config-prettier');

module.exports = [
  // Archivos/direc. a ignorar
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'public/remotes/**',
      'playwright-report/**',
      'test-results/**',
      '.vercel/**',
    ],
  },

  // Recomendadas de JS
  js.configs.recommended,

  // Recomendadas de TS (no type-checked; si quieres type-checked, te dejo nota abajo)
  ...tseslint.configs.recommended,

  // Reglas del proyecto (TS/JS)
  {
    files: ['**/*.{ts,tsx,js}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Para monorepo: autodetecta proyectos TS sin tener que listar todos
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      lit,
      wc,
    },

    settings: {
      // Resolver imports con paths de tsconfig.base.json
      'import/resolver': {
        typescript: { project: ['./tsconfig.base.json'] },
      },
    },

    rules: {
      // Calidad general
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // TS
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Orden de imports + línea en blanco después del bloque
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: '@ralphstudio/**', group: 'internal', position: 'before' }],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/newline-after-import': ['error', { count: 1 }],

      // “Aire” entre bloques lógicos
      'padding-line-between-statements': [
        'error',
        // después de imports
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },

        // después de bloque de const/let/var (pero no entre ellas)
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },

        // antes de return
        { blankLine: 'always', prev: '*', next: 'return' },

        // antes de function/class
        { blankLine: 'always', prev: '*', next: ['function', 'class'] },

        // después de bloques/if/for/while/switch
        { blankLine: 'always', prev: 'block-like', next: '*' },

        // opcional: entre case y case (mejor lectura)
        { blankLine: 'always', prev: 'case', next: 'case' },
      ],

      // no más de 1 línea en blanco seguida
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 0 }],

      // miembros de clase separados (usa la versión TS)
      // '@/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    },
  },

  // Tests unitarios (Vitest)
  {
    files: ['**/*.{spec,test}.ts'],
    languageOptions: {
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    // si quieres reglas recomendadas: instala eslint-plugin-vitest y añádelas aquí
    // plugins: { vitest: require('eslint-plugin-vitest') },
    // rules: { ...require('eslint-plugin-vitest').configs.recommended.rules },
  },

  // E2E (Playwright)
  {
    files: ['tests/e2e/**/*.ts', 'e2e/**/*.ts'],
    plugins: { playwright },
    ...playwright.configs.recommended, // trae sus reglas recomendadas
  },

  // Prettier al final para desactivar conflictos de estilo
  prettier,
];
