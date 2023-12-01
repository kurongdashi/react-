
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: '/src/App.tsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name][hash:6].js",
        // 本地BrowserRouter 配置将请求路径转发的 index.html
        publicPath: '/',
    },
    // 配置如何解析
    resolve: {
        // 别名配置
        alias: {
            // 方便导入
            '@': path.resolve(__dirname, '../src/'),
        },
        // 导入不写后缀时，默认按此规则解析
        extensions: ['.tsx', '.ts', '.js', '.less', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PUBLIC_PATH': "'/public'",
        }),
        new MiniCssExtractPlugin({
            filename: '../assets/[name][hash:6].css'
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
        })
    ],

    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,//ts、tsx 都匹配
                use: ['babel-loader'],
                exclude: '/node_modules/',
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            // 开启less 模块化使用 styles.red 使用方式
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]',
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // 自动添加css前缀
                                plugin: ['postcss-preset-env']
                            },

                        }
                    },
                    'less-loader'],
            },
            {
                test: /\.(svg|png|gif|\.jpe?g)$/,
                // use:'asset/inline',//以base64 方式导出
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name][hash:6].[ext]',
                        // 图片输出目录
                        outputPath: 'assets',
                    }
                }],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,//字体处理
                use: 'asset/resource',//以文件方式导出
            },
        ]
    },

}