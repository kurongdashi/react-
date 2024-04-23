import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routerConfig from "./router/index";
import NotFound from "./views/NotFound";
import Login from "@/views/Login";
import NoAuth from "@/views/NoAuth";
import { Spin } from "antd";
import PrivateRoute from "@/components/PrivateRoute";

// 处理路由 层
const Index: React.FC<any> = (props) => {
  return (
    <BrowserRouter>
      {/* suspense 处理异步加载组件,路由加载处配置 */}
      <Suspense fallback={<Spin tip="Loading..." />}>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          {/* 把layout嵌入 Router 中可以即可在layout使用Link  */}
          {routerConfig.map(({ path, element }, idx) => {
            // console.log('path=', path);
            return (
              <PrivateRoute
                exact
                key={idx}
                path={path}
                component={element || undefined}
              />
            );
          })}
          <PrivateRoute exact path="/noAuth" component={NoAuth} />
          <PrivateRoute exact path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
export default Index;
