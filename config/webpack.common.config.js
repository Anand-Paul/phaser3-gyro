const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/js/index.js',
        './src/sass/index.scss'
    ],
    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        https: true,
        port: 9000,
        open: true,
        host: '127.0.0.1',
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: [/.css$|.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@scss': path.resolve(__dirname, '../src/sass'),
            '@': path.resolve(__dirname, '../src')
        },
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Common Share',
            description: 'A small module for sharing in social media',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: './css/bundle.css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/images',
                to: './images'
            }
        ]),
        new CleanWebpackPlugin(),
    ]
}