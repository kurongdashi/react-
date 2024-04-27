const path = require('path');
// css 分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 生成出口文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = process.env.NODE_ENV == 'development' ? '/' : '/dist/';

module.exports = {
  entry: './src/App.tsx',
  output: {
    // path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:6].js',
    // 懒加载对应的页面 chunk.js（懒加载的子路由页面） 名称
    chunkFilename: 'js/[name].[contenthash:6].chunk.js',
    // 本地BrowserRouter 配置将请求路径转发的 index.html
    // 一般对应打包生成的目录就可以了
    publicPath,
    clean: true //打包清理dist 目录
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
    // css分离
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:6].css'
    }),
    new htmlWebpackPlugin({
      title: '打包优化',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      // 在根目录下放置 favicon.ico 就可以
      favicon: 'favicon.ico'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/, //ts、tsx 都匹配
        // thread-loader 开启多线程打包,可能会增加打包时长
        use: [
          // 'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ], //cacheDirectory 使用缓存
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
        type: 'asset/resource', //以base64 方式导出
        generator: {
          // 输出目录+hash+ext
          filename: 'assets/[hash][ext]'
        }
        // use: [
        //     {
        //         loader: 'url-loader',
        //         options: {
        //             name: '[name][hash:6].[ext]',
        //             // 图片输出目录
        //             outputPath: 'assets',
        //             //   图片小于2M 打包成base64
        //             limit: 2048
        //         }
        //     }
        // ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/, //字体处理
        type: 'asset/resource', //以文件方式导出
        generator: {
          filename: 'font/[name].[hash:3][ext]'
        }
      }
    ]
  }
};
