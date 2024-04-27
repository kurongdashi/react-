import { getApps } from './index';
import { importHtml } from './import-html';
import { getPrevRouter } from './rewrite-router';
export const handleRouter = async () => {
  // 1、匹配当前路由路径
  const apps = getApps();
  // 找到上一个应用，卸载上一个应用
  const prev = apps.find((app) => {
    return getPrevRouter().startsWith(app.activeRule);
  });
  // 加载下一个应用，否则上一个内容还在
  const app = apps.find((app) => location.pathname.startsWith(app.activeRule));
  if (prev) {
    unmount(prev);
  }
  //   非微应用不执行
  if (!app) {
    return;
  }
  console.log('app', app);
  //   增加qiankun全局变量，否则主应用会把子应用挂到主应用的容器中
  window.__POWERED_BY_QIANKUN__ = true;
  // webpack 支持动态publicPath 应用于子应用加载资源
  // if (window.__POWERED_BY_QIANKUN__) {
  //   __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  // }
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/';
  // 2、去加载对应路径资源
  const { execScript, template } = await importHtml(app.entry);
  //   4、将htm渲染到container
  const container = document.querySelector(app.container);
  //   querySelector 系列api得使用 appendChild
  container.appendChild(template);
  //   3、读取html内的script,并执行js
  const module = await execScript();
  //   将钩子函数挂到app配置对象上
  debugger;
  app.mount = module.mount;
  app.unmount = module.unmount;
  app.bootstrap = module.bootstrap;
  await bootstrap(app);
  await mount(app);
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}
async function mount(app) {
  debugger;
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container)
    }));
}
async function unmount(app) {
  debugger;
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container)
    }));
}
