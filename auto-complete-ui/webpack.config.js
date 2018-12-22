const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    devtool: 'source-map',

    entry: {
        app: './index.js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Test',
            inject: 'head',
            hash: true,
            template: '../index.html',
        }),

        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
    },
};
