import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import router from "@/router";
// 自定义路由组件，判断用户有无权限，有则渲染，无则转发到无权限页面
const Index: React.FC<any> = ({ component: Component, ...reset }) => {
  const info: any = useSelector((state) => state);
  console.log("info", info);
  const permission = info.permission || [];
  const currentPath = reset.path;
  //   不需要权限判断，直接放行
  const exclude = ["/home", "/noAuth", "*"];
  const include = exclude.includes(currentPath);

  const hasPer = permission.includes(currentPath);

  if ((permission.length && hasPer) || include) {
    return (
      <Layout>
        <Route {...reset} render={(props: any) => <Component {...props} />} />
      </Layout>
    );
  } else {
    return <Redirect to="/noAuth" />;
  }
};
export default Index;
