import { registerMicroApps, start } from 'qiankun';
// 注册乾坤子应用
registerMicroApps([
    {
        name: 'react-1',
        entry: 'http://localhost:8002/', //入口
        container: '#container', //容器
        activeRule: '/app-react' // 子应用路由
    }
]);
start();
