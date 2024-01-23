import { registerMicroApps, start, setDefaultMountApp, loadMicroApp, initGlobalState, addGlobalUncaughtErrorHandler, removeErrorHandler } from 'qiankun';
// 注册乾坤子应用
registerMicroApps([
    {
        name: 'react-1',
        entry: '//localhost:8002/', //入口
        container: '#container', //容器
        activeRule: '/app-react', // 子应用路由
        loader: loading => {
            console.log('加载子应用。。loading');
        },
        props: {
            user: '王五',
            age: 30
        }
    }
]);
// 设置默认加载的子应用，当主应用启动或刷新页面，会自动路由到此
// setDefaultMountApp('/app-react/page1/test2');
// 主应用与子应用通信 initGlobalState
const { onGlobalStateChange, setGlobalState, offGlobalStateChange } = initGlobalState({ name: 'world' });
start();
// setTimeout(() => {
//     // 设置全局变量,会和其他地方设置的值合并
//     setGlobalState({
//         name: 'zhangsan'
//     });
//     setTimeout(() => {
//         // 注销监听
//         offGlobalStateChange();
//     }, 2000);
// }, 4000);

// 监听全局变量
onGlobalStateChange((state, prev) => {
    console.log('主应用全局监听state', state, prev);
});

addGlobalUncaughtErrorHandler(e => {
    console.log('addGlobalUncaughtErrorHandler全局异常处理：', e);
});
