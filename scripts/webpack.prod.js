const path = require('path');
const { merge } = require('webpack-merge');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base');

const proConfig = {
  mode: 'production',
  //   生成环境不生成source-map打包块，只能看到那一行报错，看不到列
  devtool: 'cheap-module-source-map',
  plugins: [new FriendlyErrorsWebpackPlugin()]
};

module.exports = merge(proConfig, baseConfig);
