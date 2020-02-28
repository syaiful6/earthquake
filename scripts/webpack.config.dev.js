const path = require('path');
const config = require('./webpack.config.js');
var CopyWebpackPlugin = require('copy-webpack-plugin')

config.mode = 'development';

config.devServer = {
  contentBase: path.resolve(__dirname, '../dist'),
};

config.watchOptions = {
  ignored: /node_modules/
};

if (!Array.isArray(config.plugins)) config.plugins = [];
config.plugins.push( new CopyWebpackPlugin([
   {from: path.resolve(__dirname, '../index.html')},
]));
module.exports = config;
