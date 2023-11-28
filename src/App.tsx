import React from 'react';
import { createRoot } from 'react-dom/client';
import Entry from './Entry';
import './App.less';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from '@/store/reducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import "@/mock/index"
// 可合并reducer
// const reduceMerge=combineReducers(reducer);
// 使用applyMiddleware 中间件，可以支持action 返回一个方法
const store = createStore(reducer, applyMiddleware(thunk));
// 做 provider 层
const root = createRoot(document.getElementById('root') as any)
root.render(<Provider store={store}>
    <Entry />
</Provider>);