const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
module.exports = {
    devServer: {
        port: 8080,
        compress: true,
        // contentBase: '',
        historyApiFallback: true
     },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
        }
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: [
        path.resolve(__dirname, './src/index.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                    'css-loader',
                //     { 
                //     loader: 'postcss-loader',
                //     options: { sourceMap: true, 
                //         postcssOptions: {
                //             config: path.resolve(__dirname, "./postcss.config.js"),
                //         },
                //     }
                //   },
                 {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                  },
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',  
                    name: '[name].[ext]'
                }
            },
        ]
    },
    plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            // new copyPlugin({
            //     patterns: [
            //         {from: './src/img', to: 'img'}
            //     ]
            // })
        ],
}