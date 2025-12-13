import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const isStorybook = process.argv[1]?.includes('storybook')

export default defineConfig({
    plugins: [
        !isStorybook &&
            dts({
                include: ['src'],
                rollupTypes: true,
            }),
    ].filter(Boolean),
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
        },
        sourcemap: true,
        minify: 'esbuild',
    },
})
