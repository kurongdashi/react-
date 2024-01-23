import React, { useEffect, useState } from 'react';
import { Button, Divider, Typography, Space } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { loadMicroApp, initGlobalState, prefetchApps } from 'qiankun';
class Index extends React.Component {
    refDiv: any;
    app2: any;
    setGlobalState: any;
    state = {
        isUpdate: false,
        count: 0
    };

    componentDidMount(): void {
        const { onGlobalStateChange, setGlobalState } = initGlobalState({ account: 'account', email: '123456@qq.com' });
        this.setGlobalState = setGlobalState;
        console.log('mount--');
        const entry = '//localhost:8003';
        // 手动加载组件子应用，返回app实例，具有mount,unmount,update等方法
        this.app2 = loadMicroApp({
            name: 'app2',
            entry,
            container: this.refDiv,
            // 主应用初始化子应用要传递的参数，会和name参数合并
            props: {
                user: '张无忌',
                age: 20
            }
        });
        // 提前加载子应用的静态资源，必须搭配手动加载子应用一起
        prefetchApps([{ name: 'app2', entry }]);

        onGlobalStateChange((state, prev) => {
            console.log('主应用监听子应用修改state', state, prev);
        });
    }
    componentWillUnmount(): void {
        console.log('unmount--');
        this.app2.unmount();
    }
    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log('DidUpdate--');
        // this.app2.update();
    }
    shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
        console.log('组件入参nextProps=', nextProps);
        console.log('组件当前nextState=', nextState);
        console.log('nextContext=', nextContext);
        return true;
    }
    onClickBtn() {
        // 主应用修改state
        this.setGlobalState({
            account: '张无忌',
            email: '123456@qq.com'
        });
    }
    render(): React.ReactNode {
        return (
            <div>
                <Title>动态加加载子组件应用</Title>
                <div>
                    主应用可修改state
                    <Button onClick={this.onClickBtn.bind(this)}>主应用按钮</Button>
                </div>

                <div ref={e => (this.refDiv = e)}></div>
            </div>
        );
    }
}
export default Index;
