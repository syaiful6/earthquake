const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    map: path.resolve(__dirname, '../src/js/map.js'),
    worker: path.resolve(__dirname, '../src/js/worker.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: []
          }
        }]
      }
    ]
  },
  plugins: [
  ]
}
