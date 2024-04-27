import { handleRouter } from './handle-router';
/**
 * 监听，重写history
 */
let prevRouter = '',
  nextRouter = location.pathname;

export const getPrevRouter = () => prevRouter;
export const getNextRouter = () => nextRouter;

export function rewriteRouter() {
  // 入栈 ：先入A ,再入B,最后入C
  window.addEventListener('popstate', () => {
    console.log('监听浏览器后退');
    // 出:先出C,再出B,最后出A
    prevRouter = nextRouter;
    nextRouter = location.pathname;
    handleRouter();
  });
  // 重写前保留原方法
  const newPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    // 记录导航前路由
    prevRouter = location.pathname;
    newPushState.apply(window.history, args);
    console.log('监听路由调整');
    // 导航后路由
    nextRouter = location.pathname;
    if (prevRouter !== nextRouter) {
      handleRouter();
    }
  };
  const newReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    prevRouter = location.pathname;
    newReplaceState.apply(window.history, args);
    console.log('监听路由替换');
    nextRouter = location.pathname;
    if (prevRouter !== nextRouter) {
      handleRouter();
    }
  };
}
