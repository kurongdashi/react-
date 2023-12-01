import React from 'react'
// 使用懒加载优化
const Test1 = React.lazy(() => import('./Test1'));
const Test2 = React.lazy(() => import('./Test2'));
const Index = [
    {
        title: '测试页面1-1',
        path: '/page1/test1',
        element: Test1,
    },
    {
        title: '测试页面1-2',
        path: '/page1/test2',
        element: Test2,
    },

]
export default Index;