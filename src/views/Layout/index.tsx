import React, { ReactNode, useEffect, useState } from 'react';
import styles from './index.less'
interface Props{
    children: ReactNode
}
/**
 * 公共布局
 * @param props 
 * @returns 
 */
const Index:React.FC<Props> = (props)=>{
    const [page,setPage]=useState('');
    console.log("styles=",styles)
    useEffect(()=>{
        setPage('hello')
    },[])
    return (
        <div className={styles['layout']}>
            <div className={styles['header-box']}></div>
             <div className={styles['content-box']}> {props.children}</div>
        </div>
    )
            
}
export default Index;