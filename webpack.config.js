'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './common/index',
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'js'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        exclude: /node_modules\/(?!(joi|hoek|isemail|@oneinfo|topo)\/).*/,
        include: __dirname,
      }, {
        test: /\.json$/,
        loaders: [ 'json' ],
        exclude: /node_modules/,
        include: __dirname,
      }
    ]
  },
  node: {
    net: 'mock',
    dns: 'mock',
  },
};
