import React from 'react';
/**
 * 只要两个方法中任意一个就变成错误捕获组件
 */

export default class MyBoundary extends React.Component {
  state = {
    hasError: false
  };
  // 此方法用渲染报错后的UI页面
  static getDerivedStateFromError(err: any) {
    return { hasError: true };
  }
  // 此方法打印错误日志
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('error=', error);
    console.error('errorInfo=', errorInfo);
  }
  render(): React.ReactNode {
    return (
      <>
        {this.state.hasError ? (
          <div>报错了亲</div>
        ) : (
          (this.props as any).children
        )}
      </>
    );
  }
}
