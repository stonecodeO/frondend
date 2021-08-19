const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Micro-Front shell",
            template: 'index.html'
        })
    ],
    module: {
        rules:[{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devServer: {
        contentBase: './dist',
        port: 3000
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}