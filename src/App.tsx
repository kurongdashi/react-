import React from 'react';
import { createRoot } from 'react-dom/client';
import Entry from './Entry';
import './App.less';
import { createStore } from 'redux';
import reducer from '@/store/reducer'
import { Provider } from 'react-redux'

const store = createStore(reducer);
// 做 provider 层
const root = createRoot(document.getElementById('root') as any)
root.render(<Provider store={store}>
    <Entry />
</Provider>);