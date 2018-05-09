const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './client/index.js',
    'webpack-hot-middleware/client'
  ],
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
      }, 
      {
        test: /(\.woff|\.ttf|\.svg|\.eot|\.gif)/,
        use: 'url-loader'
      }, 
      {
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
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
