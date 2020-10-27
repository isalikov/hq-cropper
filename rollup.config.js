import babel from '@rollup/plugin-babel'

const config = {
    input: 'lib/index.js',
    output: {
        file: 'dist/main.min.js',
        format: 'iife',
    },
    plugins: [babel({ babelHelpers: 'bundled' })],
}

export default config
