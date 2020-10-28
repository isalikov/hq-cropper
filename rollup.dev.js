import babel from '@rollup/plugin-babel'

const config = [{
    input: 'lib/index.js',
    output: {
        file: 'dev/hq-cropper.dev.js',
        format: 'iife',
    },
    plugins: [
        babel({ babelHelpers: 'bundled' }),
    ],
}]

export default config
