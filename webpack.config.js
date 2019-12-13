const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: "./src/App/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HTMLWebpackPlugin(),
    new CopyPlugin([
      { from: './src/App/data.json', to: './data.json' },
      { from: './src/App/component/image/HDFC_ERGO.png', to: './image/HDFC_ERGO.png' },
      { from: './src/App/component/image/RELIANCE_GENERAL.png', to: './image/RELIANCE_GENERAL.png' },
      { from: './src/App/component/image/RELIGARE_HEALTH.png', to: './image/RELIGARE_HEALTH.png' }
    ]),
    require('autoprefixer'),
  ],
  devServer: {
    open: true,
    historyApiFallback: true
  }
}
