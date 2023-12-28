const path = require('path');
// css 分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css 压缩
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// 生成出口文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 清除dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack copy 相关文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 打包优化分析代码
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  entry: '/src/App.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name][contenthash:6].js',
    // 入口对应chunk.js 名称
    chunkFilename: 'js/[name][contenthash:6].chunk.js',
    // 本地BrowserRouter 配置将请求路径转发的 index.html
    // 一般对应打包生成的目录就可以了
    publicPath: '/dist/'
  },
  // 配置如何解析
  resolve: {
    // 别名配置
    alias: {
      // 方便导入
      '@': path.resolve(__dirname, '../src/')
    },
    // 导入不写后缀时，默认按此规则解析
    extensions: ['.tsx', '.ts', '.js', '.less', '.json']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, '../public/README.md'), to: path.resolve(__dirname, '../dist/README.md') }]
    }),
    // new WebpackBundleAnalyzer(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': "'/public'"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:6].css'
    }),
    // css 压缩
    new OptimizeCssPlugin(),
    new htmlWebpackPlugin({
      title: '打包优化',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      // 在根目录下放置 favicon.ico 就可以
      favicon: 'favicon.ico'
    })
  ],
  optimization: {
    usedExports: true, //开启 tree-shaking 项目中未使用到的依赖删除掉，不打包
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
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/, //ts、tsx 都匹配
        use: ['babel-loader?cacheDirectory'], //?cacheDirectory 使用缓存
        // exclude: '/node_modules/'
        include: [path.resolve('src')] // 缩小范围
      },
      {
        test: /\.less$/,
        use: [
          //   'style-loader',// css 在js中
          MiniCssExtractPlugin.loader, // css 单独提取
          {
            loader: 'css-loader',
            options: {
              // 开启less 模块化使用 styles.red 使用方式
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                // 自动添加css前缀
                plugin: [
                  // css 加浏览器兼容前缀
                  require('autoprefixer'),
                  // 帮助找到package.json 里的browserslist 配置作用兼容浏览器
                  require('postcss-preset-env')
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(svg|png|gif|\.jpe?g)$/,
        // use:'asset/inline',//以base64 方式导出
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name][hash:6].[ext]',
              // 图片输出目录
              outputPath: 'assets',
              //   图片小于2M 打包成base64
              limit: 2048
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/, //字体处理
        use: 'asset/resource', //以文件方式导出
        generator: {
          filename: 'font/[name].[hash:3][ext]'
        }
      }
    ]
  }
};
