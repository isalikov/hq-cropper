const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
    HotModuleReplacementPlugin,
    SourceMapDevToolPlugin,
} = require('webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
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
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'styleTag' },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    output: {
        chunkFilename: isDevelopment
            ? '[id].chunk.js'
            : '[id].[chunkhash].chunk.js',
        filename: isDevelopment ? '[name].bundle.js' : '[contenthash:24].js',
        path: path.join(__dirname, 'docs'),
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
        isDevelopment && new HotModuleReplacementPlugin(),
        new SourceMapDevToolPlugin({}),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
            inject: 'body',
        }),
    ].filter(Boolean),
}
