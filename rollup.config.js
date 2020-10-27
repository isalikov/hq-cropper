import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const config = {
    input: 'lib/index.js',
    output: {
        file: 'dist/main.min.js',
        format: 'iife',
        plugins: [
            terser(),
        ],
    },
    plugins: [
        babel({ babelHelpers: 'bundled' }),
    ],
}

export default config
