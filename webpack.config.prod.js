const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.scss|\.css)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /(\.woff|\.ttf|\.svg|\.eot|\.gif)/,
        use: 'url-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'styles')
    }
  },
  plugins: [
    new extractTextPlugin({allChunks: true, filename: 'styles.css'}),
    new htmlWebpackplugin({template: './client/views/index.html', inject: false}),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
