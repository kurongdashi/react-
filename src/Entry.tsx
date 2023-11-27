import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routerConfig from './router/index'
import NotFound from './views/NotFound'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
// 处理路由 层
const Index: React.FC<any> = (props) => {
    return (
        <BrowserRouter>
            {/* 把layout嵌入 Router 中可以即可在layout使用Link  */}
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    {
                        routerConfig.map(({ path, element }, idx) => {
                            console.log('path=', path)
                            return <Route exact key={idx} path={path} component={element}></Route>
                        })
                    }
                    <Route component={NotFound}></Route>
                </Switch>
            </Layout>
        </BrowserRouter>
    )

}
export default Index;     