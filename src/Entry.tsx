import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routerConfig from './router/index';
import NotFound from './views/NotFound';
import Layout from '@/views/Layout';
import Home from '@/views/Home';
import { ConfigProvider, Spin } from 'antd';

// 处理路由 层
const Index: React.FC<any> = props => {
    return (
        <BrowserRouter>
            {/* 把layout嵌入 Router 中可以即可在layout使用Link  */}
            <Layout>
                {/* suspense 处理异步加载组件,路由加载处配置 */}
                <Suspense fallback={<Spin tip="Loading..." />}>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        {routerConfig.map(({ path, element }, idx) => {
                            // console.log('path=', path);
                            return <Route exact key={idx} path={path} component={element || undefined}></Route>;
                        })}
                        <Route component={NotFound}></Route>
                    </Switch>
                </Suspense>
            </Layout>
        </BrowserRouter>
    );
};
export default Index;
