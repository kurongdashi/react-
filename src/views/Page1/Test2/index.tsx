import React, { useEffect, useState } from 'react';

const Index:React.FC = ()=>{
    const [page,setPage]=useState('');

    useEffect(()=>{
        setPage('world')
    },[])
    return <div>测试页面2--{page}</div>
            
}
export default Index;