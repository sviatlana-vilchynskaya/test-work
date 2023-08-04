/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const publicPath = isDevelopment ? '/' : './';


  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, isDevelopment ? 'src' : 'dist'),
      filename: 'bundle.js',
      publicPath: publicPath, 
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },

      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        publicPath: publicPath,
      }),
      isDevelopment && new HotModuleReplacementPlugin(),
      !isDevelopment && new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets/images',
            to: 'assets/images',
          },
        ],
      }),
    ].filter(Boolean),
    devServer: {
      static: path.join(__dirname, 'src'),
      hot: isDevelopment,
      port: 8080,
    },
  };
};
