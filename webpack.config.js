const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

ENTRY_PATH = path.resolve(__dirname, "src/index")
DIST_PATH = path.resolve(__dirname, "dist")

module.exports = {
    entry: ENTRY_PATH,
    output: {
        path: DIST_PATH,
        filename: 'bundle.[contenthash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(s([ac])ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new StylelintPlugin({
            files: '**/*.scss',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            PUBLIC_URL: '',
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
};
