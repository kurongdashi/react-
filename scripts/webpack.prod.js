const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
// 清除dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
6;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base');
// css 分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包优化分析代码
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// css 压缩
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

// webpack copy 相关文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const proConfig = {
    mode: 'production',
    // mode: 'development',
    //   生成环境不生成source-map打包块，只能看到那一行报错，看不到列
    devtool: 'cheap-module-source-map',
    optimization: {
        //mode=production默认开启 tree-shaking 项目中未使用到的依赖删除掉，不打包, 项目中只能使用es6的导入导出、不能使用commonJS规范
        // 当整个项目都没有副作用（副作用：import 出来的文件有，没有在代码中手动使用，也会有其他的作用），
        // package.json 配置 "sideEffects": ["./src/some-side-effectful-file.js"] 哪些文件有副作用
        // package.json 配置 sideEffect:false, 整个项目都没有副作用
        // sideEffects: true, // optimization.sideEffects=true 表示需要依赖package.json 配置去解析
        // usedExports: true,
        runtimeChunk: true, //运行时：异步加载代码（路由懒加载）处理的逻辑，可以将其内联到index.html中减少请求
        // 分离公共依赖(第三方库，lodash,react,vue等等)分离，这些依赖一般只打包一次，后面不在修改所以需要依赖分离
        moduleIds: 'deterministic', //被哈希转化成的小位数值模块名： 不能让代码中依赖修改影响verdors 重新打包，保证vendor 的哈希值不再变化
        splitChunks: {
            // 将分离的库加入缓存
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
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, '../public/README.md'), to: path.resolve(__dirname, '../dist/README.md') }]
        }),
        // new WebpackBundleAnalyzer(),
        // new CleanWebpackPlugin(), //可使用output.clean 替代
        new webpack.DefinePlugin({
            'process.env.PUBLIC_PATH': "'/public'"
        }),

        // css 压缩
        new OptimizeCssPlugin()
    ]
};

module.exports = merge(proConfig, baseConfig);
