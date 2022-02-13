const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
    DefinePlugin,
    HotModuleReplacementPlugin,
    SourceMapDevToolPlugin,
} = require('webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development',
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.html'],
        modules: ['node_modules', 'src'],
    },
    resolveLoader: {
        modules: ['node_modules', 'src'],
    },
    entry: {
        main: ['./public/index.ts'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
            },
        ],
    },
    output: {
        chunkFilename: '[id].chunk.js',
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        allowedHosts: ['*'],
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 9000,
    },
    stats: {
        children: true,
        errorDetails: true,
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        }),
        isDevelopment && new HotModuleReplacementPlugin(),
        new SourceMapDevToolPlugin({}),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
            inject: 'body',
        }),
    ].filter(Boolean),
}
