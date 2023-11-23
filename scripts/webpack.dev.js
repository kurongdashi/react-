
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:'/src/*.ts',
    output:path.resolve(__dirname,'dist'),
    // filename:"[name][hash:6].[ext]",
    // 别名配置
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'src'),
        }
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,//ts、tsx 都匹配
                use:[{
                    loader:'ts-loader',
                    options: {  
                        transpileOnly: true,  
                        compilerOptions: {  
                          jsx: 'react'  
                        }  
                    }
                }],
                exclude:'node_modules',
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    "css-loader",
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                // 自动添加css前缀
                                plugin:['postcss-preset-env']
                            }
                        }
                    },
                    'less-loader'],
                exclude:'node_modules',
            },
            {
                test:/\.(svg|png|gif|\.jpe?g)$/,
                type:'asset/resources',//webpack5 内置
                generator:{
                    filename:'[name][hash:6].[ext]',
                }
                // use:[{
                //     loader:'file-loader',
                //     options:{
                //         name:'[name][hash:6].[ext]',
                //         outputPath:'assets',
                //     }
                // }],
            },
        ]
    },
    plugin:[
        new cleanWebpackPlugin(),
    ],
    // 配置本地服务
    devServer:{
        hot:true,
        port:8000,
        open:true,
        compress:true,
        proxy:{
            "/api":{
                target:'https://www.baidu.com',
                pathRewrite:{
                    '^/api':'',
                },
                changeOrigin:true,

            }
        }
    }

}