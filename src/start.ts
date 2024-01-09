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

const library = require('../lib/library.js');
console.log('start---library', library);
console.log(library.add(1, 2, 3, 4, 5));
