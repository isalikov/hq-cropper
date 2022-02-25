import dts from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const config = [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/bundle.cjs.js',
            sourcemap: true,
            format: 'cjs',
            plugins: [terser()],
        },
        plugins: [typescript()],
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
]

export default config
