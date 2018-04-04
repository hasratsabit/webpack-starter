const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',

    module: {
      rules: [
          {
              test: /\.js$/,
              use: 'babel-loader',
              exclude: /node_modules/
          },
          {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
              exclude: /node_modules/
          }
      ]
  },

    devServer: {
        contentBase: './dist',
        compress: true,
        hot: true,
        port: 4200,
        stats: {
          colors: true,
          chunks: false,
          assets: false,
          timings: false,
          modules: false,
          hash: false,
          version: false
        }
      },

      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
})