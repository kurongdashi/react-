const path = require('path');
const { merge } = require('webpack-merge');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base');

const proConfig = {
    mode: 'production',
    //   生成环境不生成source-map打包块，只能看到那一行报错，看不到列
    devtool: 'cheap-module-source-map',
    optimization: {
        usedExports: true, //mode=production默认开启 tree-shaking 项目中未使用到的依赖删除掉，不打包, 项目中只能使用es6的导入导出、不能使用commonJS规范
        moduleIds: 'deterministic',
        runtimeChunk: true, //runtime 单独抽取
        splitChunks: {
            cacheGroups: {
                // 将第三方库(library)提取到单独的 vendor chunk 文件中
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

    plugins: [new FriendlyErrorsWebpackPlugin()]
};

module.exports = merge(proConfig, baseConfig);
