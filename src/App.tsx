import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import Entry from './Entry'

// 做 provider 层
const Index:React.FC<any>=()=>{
    return (
        <BrowserRouter>
         <Entry />
        </BrowserRouter>
    )
   
            
}
ReactDOM.render(<Index/>,document.getElementById('root'));