import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'HQ-Cropper',
    description:
        'Lightweight, zero-dependency image cropper for high-quality square crops',
    ignoreDeadLinks: [/^\/storybook\//],

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
        ['meta', { name: 'theme-color', content: '#3b82f6' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'HQ-Cropper' }],
        [
            'meta',
            {
                property: 'og:description',
                content:
                    'Lightweight, zero-dependency image cropper for high-quality square crops',
            },
        ],
        ['meta', { property: 'og:url', content: 'https://hqcropper.dev' }],
    ],

    themeConfig: {
        logo: '/logo.svg',

        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'API', link: '/api/reference' },
            { text: 'Examples', link: '/examples/basic' },
            { text: 'Demo', link: '/storybook/', target: '_blank' },
            {
                text: 'v4.0.0',
                items: [
                    { text: 'Changelog', link: '/changelog' },
                    {
                        text: 'npm',
                        link: 'https://www.npmjs.com/package/hq-cropper',
                    },
                ],
            },
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    items: [
                        {
                            text: 'Getting Started',
                            link: '/guide/getting-started',
                        },
                        { text: 'Installation', link: '/guide/installation' },
                    ],
                },
                {
                    text: 'Configuration',
                    items: [
                        { text: 'Options', link: '/guide/configuration' },
                        { text: 'Custom Styling', link: '/guide/styling' },
                        { text: 'Fonts', link: '/guide/fonts' },
                    ],
                },
                {
                    text: 'Features',
                    items: [
                        { text: 'Mobile Support', link: '/guide/mobile' },
                        {
                            text: 'Error Handling',
                            link: '/guide/error-handling',
                        },
                    ],
                },
            ],
            '/api/': [
                {
                    text: 'API Reference',
                    items: [
                        { text: 'HqCropper', link: '/api/reference' },
                        { text: 'Types', link: '/api/types' },
                    ],
                },
            ],
            '/examples/': [
                {
                    text: 'Examples',
                    items: [
                        { text: 'Basic Usage', link: '/examples/basic' },
                        { text: 'React', link: '/examples/react' },
                        { text: 'Vue', link: '/examples/vue' },
                        { text: 'Angular', link: '/examples/angular' },
                        { text: 'Svelte', link: '/examples/svelte' },
                        { text: 'Vanilla JS', link: '/examples/vanilla' },
                    ],
                },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/isalikov/hq-cropper' },
            { icon: 'npm', link: 'https://www.npmjs.com/package/hq-cropper' },
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 Iakov Salikov',
        },

        search: {
            provider: 'local',
        },

        editLink: {
            pattern:
                'https://github.com/isalikov/hq-cropper/edit/master/docs/:path',
            text: 'Edit this page on GitHub',
        },
    },
})
