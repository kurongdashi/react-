import React from 'react';
const Test1 = React.lazy(() => import('./Test1'));
const Test2 = React.lazy(() => import('./Test2'));
const Test3 = React.lazy(() => import('./Test3'));
const Test4 = React.lazy(() => import('./Test4'));

const Index = [
    {
        title: 'js的loop轮询机制',
        path: '/page2/test1',
        element: Test1
    },
    {
        title: 'crypto-js的加解密',
        path: '/page2/test2',
        element: Test2
    },
    {
        title: '深入了解react ',
        path: '/page2/test3',
        element: Test3
    }
    // {
    //     title: 'qiankun动态加载子组件应用 ',
    //     path: '/page2/test4',
    //     element: Test4
    // }
];
export default Index;
