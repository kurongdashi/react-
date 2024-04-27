import { rewriteRouter } from './rewrite-router';
import { handleRouter } from './handle-router';
// {
//     name: 'react-app2',
//     entry: '//localhost:8002/', //入口
//     container: '#subapp-container', //容器
//     activeRule: '/app-react2' // 子应用路由
//   }
let _apps = [];
// 1、注册路由
export function registerMicroApps(apps) {
  _apps = apps;
}
export const getApps = () => _apps;

export function start() {
  // 2、监视路由变化
  rewriteRouter();
  // 初始执行一次
  handleRouter();
}
