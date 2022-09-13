const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    target: 'node',
    stats: 'minimal',
    externalsPresets: {
        node: true
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join( __dirname, '.webpack'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                exclude: [
                    [
                        path.resolve( __dirname, '.serverless' ),
                        path.resolve( __dirname, '.webpack' ),
                    ],
                ],
                options: {
                    transpileOnly: true,
                    // Enable file caching, can be quite useful when running offline
                    experimentalFileCaching: true,
                },
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['ts']
        })
    ],
    externals: [ nodeExternals() ],
    devtool: slsw.lib.webpack.isLocal ? 'source-map' : 'cheap-source-map',
};

