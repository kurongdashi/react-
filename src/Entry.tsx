import React, { useEffect } from 'react';
import { BrowserRouter,HashRouter, Route, Switch } from 'react-router-dom'
import routerConfig from './router/index'
import NotFound from './views/NotFound'
// 处理路由 层
const Index: React.FC<any> = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/hhh" component={NotFound}></Route>
                {
                    routerConfig.map(({ path, element }, idx) => {
                        console.log('path=', path)
                        return <Route exact key={idx} path={path} component={element}></Route>
                    })
                }
                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )

}
export default Index;     