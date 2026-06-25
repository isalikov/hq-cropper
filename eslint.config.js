// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    {
        ignores: [
            'dist',
            'storybook-static',
            'node_modules',
            'docs/.vitepress/cache',
            'docs/.vitepress/dist',
        ],
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    eslintConfigPrettier,
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },
    storybook.configs['flat/recommended']
)
