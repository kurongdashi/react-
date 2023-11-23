import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import routerConfig from './router/index'
import NotFound from './views/NotFound'
// 处理路由 层
const Index:React.FC<any>=(props)=>{
    return <BrowserRouter>
            <Switch>
                {
                    routerConfig.map(({path,element},idx)=>{
                        return <Route key={idx} path={path} component={element}></Route>
                    })
                }
                <Route  component={NotFound}></Route>
            </Switch>
            </BrowserRouter>
            
}
export default Index;