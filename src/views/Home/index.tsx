import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import styles from './index.less';

const Index:React.FC = ()=>{
    const history=useHistory();

    return <div className={styles['home']}> 
                这里是首页
             </div>
            
}
export default Index;