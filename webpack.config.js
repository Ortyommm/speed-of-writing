const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

// const webpackDevServer = require('webpack-dev-server')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),//второе - куда
    environment: {
      arrowFunction: false
    },
  },
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  devtool: isProd ? 'source-map' : 'eval-cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.0.110',
    port: 4200,
    hot: true
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    autoprefixer
  ],
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']//rtl: импорт, после стили идут в отдельный файл
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']//rtl: импорт, после стили идут в отдельный файл
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader'
          },
          {

            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          },
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  optimization: {
    // minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin(
      {
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        // parallel: true
      }
    )],
  },
  target: 'web',
}
