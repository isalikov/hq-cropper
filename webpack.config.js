const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

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
        hot: true,
        host: '0.0.0.0',
        port: 9000,
    },
    stats: {
        children: true,
        errorDetails: true,
    },
    plugins: [
        new SourceMapDevToolPlugin({}),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
            inject: 'body',
        }),
    ],
}
