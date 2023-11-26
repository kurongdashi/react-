import React from 'react';
import {createRoot} from 'react-dom/client';
import Entry from './Entry'


// 做 provider 层
const root=createRoot(document.getElementById('root'))
root.render(<Entry/>);