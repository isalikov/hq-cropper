import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

const config = [{
    input: 'src/index.ts',
    output: {
        file: 'dist/hq-cropper.js',
        format: 'iife',
        plugins: [
            terser(),
        ],
    },
    plugins: [
        typescript(),
    ],
}, {
    input: 'src/index.ts',
    output: {
        file: 'dist/main.min.js',
        format: 'cjs',
        plugins: [
            terser(),
        ],
    },
    plugins: [
        typescript(),
    ],
}]

export default config
