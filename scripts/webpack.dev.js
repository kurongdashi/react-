
const path = require('path');
const {merge} = require('webpack-merge')
const portfinder = require('portfinder')
const baseConfig = require('./webpack.base');
const { PORT } = require('./utils/constant');

// require('./utils')
// 设置默认端口
portfinder.basePort = PORT;

const devConfig = {
    mode: 'development',
    // 配置本地服务
    devServer: {
        hot: true,
        port: PORT,
        // open: true,
        compress: true,
        proxy: {
            "/api": {
                target: 'https://www.baidu.com',
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: true,

            }
        }
    }

}

module.exports = async function () {
    try {
        // 如果当前端口被占用，则自动返回下一个端口
        const port = await portfinder.getPortPromise();
        devConfig.devServer.port = port;
        return merge(devConfig, baseConfig)
    } catch (error) {
        throw new Error(error)
    }
}
