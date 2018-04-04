
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');




module.exports = {

    entry: {
        app: './src/script/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[hash:12].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        minified: true
                    }
                }
            },
            {
                test: /\.(jpg|png|png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2|webm|mp4)$/,
                use: [
                    {
                        loader: 'file-loader?[limit=10000]',
                        options: {
                            name: '[name][hash:12].[ext]',
                            outputPath: 'assets/images/',
                            publicPath: 'images/'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(html)$/,
                use: 'html-loader',
                exclude: /node_modules/
            }
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
          ],
        minimize: false,
        runtimeChunk: {
            name: 'vendor',
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    },

    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/images/favicon.png',
            prefix: 'assets/icons-[hash]/',
            emitStats: false,
            persistentCache: true,
            inject: true,
            background: '#fff',
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true
        }),
    ]
}