import React, { Suspense, useContext } from 'react';
import MyContext from './Context';
import { createRoot } from 'react-dom/client';
import Entry from './Entry';
import './App.less';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from '@/store/reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import '@/mock/index';
import { ConfigProvider } from 'antd';
// antd 组件的本地化语言设置
import zhCN from 'antd/locale/zh_CN';
// antd中使用了dayjs处理日期，还需dayjs 本地化
import dayjs from 'dayjs';
import './start';
import 'dayjs/locale/zh-cn';
import MyBoundary from './ErrorBoundary';
dayjs.locale('zh-cn');
import * as _ from 'lodash';
console.log('_.join:', _.join(['1', '2', '3'], ' '));
const library = require('../lib/library');
console.log('library=', library);
// 可合并reducer
// const reduceMerge=combineReducers(reducer);
// 使用applyMiddleware 中间件，可以支持action 返回一个方法
const store = createStore(reducer, applyMiddleware(thunk));
// 做 provider 层
const root = createRoot(document.getElementById('root') as any);
const Info = { address: '广州上汤', tel: '13423882680', email: 'abcd6@qq.com' };
const App = () => {
    const context = useContext(MyContext);
    console.log('APP context=', context);
    return (
        // antd 配置
        <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }} locale={zhCN}>
            {/* redux store */}
            <Provider store={store}>
                <MyContext.Provider value={Info}>
                    <MyBoundary>
                        <Entry />
                    </MyBoundary>
                </MyContext.Provider>
            </Provider>
        </ConfigProvider>
    );
};
root.render(<App />);
