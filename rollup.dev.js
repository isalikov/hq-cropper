import typescript from '@rollup/plugin-typescript';

const config = [{
    input: 'src/index.ts',
    output: {
        file: 'dev/hq-cropper.dev.js',
        format: 'iife',
    },
    plugins: [
        typescript(),
    ],
}]

export default config
