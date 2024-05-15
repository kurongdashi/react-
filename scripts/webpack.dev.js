const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const baseConfig = require('./webpack.base');
const { PORT } = require('./utils/constant');

// require('./utils')
// 设置默认端口
portfinder.basePort = PORT;

const devConfig = {
  mode: 'development',
  // source-map包含行列映射，看到报错具体行列，打包慢；cheap-module-source-map 只有行错误，
  devtool: 'cheap-module-source-map',
  // 配置本地服务
  devServer: {
    hot: true,
    port: PORT,
    open: true,
    compress: true, //压缩代码
    // 本地BrowserRouter 配置将请求路径转发的 index.html
    historyApiFallback: true,
    proxy: {
      // 例如访问 https://www.baidu.com/gateway/getInfo 接口会跨域，那么走本地服务器代理，服务器之间通信没有同源政策限制
      // 匹配到一个包括url包含/api，自动拦截
      '/api': {
        // 本地serve服务器转发到目标服务器地址
        target: 'https://www.baidu.com',
        // 是否要重新url,当然因为我们的真实目标地址是/gateway
        pathRewrite: {
          '^/api': ''
        },
        // 是否要修改请求头里面的origin，因为很多服务器限制只能某些origin能访问
        changeOrigin: true
      }
    }
  }
};

module.exports = async function () {
  try {
    // 如果当前端口被占用，则自动返回下一个端口
    const port = await portfinder.getPortPromise();
    devConfig.devServer.port = port;
    return merge(devConfig, baseConfig);
  } catch (error) {
    throw new Error(error);
  }
};
