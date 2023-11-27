import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import routerConfig from './router/index'
import NotFound from './views/NotFound'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
// 处理路由 层
const Index: React.FC<any> = (props) => {
    return (
        <Layout>
            <BrowserRouter>
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
            </BrowserRouter>
        </Layout>
    )

}
export default Index;     