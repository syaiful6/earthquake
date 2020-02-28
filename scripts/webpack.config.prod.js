const path = require('path')
const webpack = require('webpack');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = require('./webpack.config.js');

// we need to route this to folder asssets because we use python to serve our content
config.output.path = path.resolve(__dirname, '../assets'),

config.mode = 'production';
if (!Array.isArray(config.plugins)) config.plugins = [];
config.plugins.push(new webpack.DefinePlugin({
  "process.env": { NODE_ENV: JSON.stringify("production") }
}));

config.plugins.push(new UglifyWebpackPlugin({
  sourceMap: false
}));

config.plugins.push(new CompressionPlugin({
  asset: "[path].gz[query]",
  algorithm: "gzip",
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0
}));

module.exports = config;
