import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [],
    framework: {
        name: '@storybook/html-vite',
        options: {},
    },
}

export default config
