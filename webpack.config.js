var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var TEM_PATH = path.resolve(ROOT_PATH, '');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.ts'),
    // vendors: []
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {}
  },
  // // enable dev source map
  // devtool: 'eval-source-map',
  // // enable dev server
  // devServer: {
  //   hot: true,
  //   // contentBase: path.resolve(__dirname, 'dist'),
  //   // publicPath: '/'
  // },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: 'vox world',
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ]
};