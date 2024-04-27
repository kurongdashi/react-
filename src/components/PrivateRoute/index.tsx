import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import router from '@/router';
// 自定义路由组件，判断用户有无权限，有则渲染，无则转发到无权限页面
const Index: React.FC<any> = ({ component: Component, ...reset }) => {
  const info: any = useSelector((state) => state);
  console.log('info', info);
  const history: any = useHistory();
  useEffect(() => {
    if (!info.account) {
      const path = location.pathname + location.search;
      history.push({
        pathname: `/?url=${encodeURIComponent(path)}`
      });
    } else {
    }
  }, [info.account]);

  const permission = info.permission || [];
  const currentPath = reset.path;
  //   不需要权限判断，直接放行
  const exclude = ['/home', '/noAuth', '*'];
  const appRoute = currentPath.startsWith('/app-react');
  const isOtherPage = exclude.includes(currentPath);

  const hasPer = permission.includes(currentPath);
  if (info.account) {
    // 没配置权限，或有权限，或不需要权限的页面直接放行
    if ((permission.length && hasPer) || isOtherPage) {
      return (
        <Layout>
          <Route {...reset} render={(props: any) => <Component {...props} />} />
        </Layout>
      );
    } else if (appRoute) {
      return (
        <Layout>
          {/* 在主应用中增加子应用容器id */}
          <div>其他</div>
          <div id="subapp-container"></div>
        </Layout>
      );
    } else {
      return <Redirect to="/noAuth" />;
    }
  }
};
export default Index;
