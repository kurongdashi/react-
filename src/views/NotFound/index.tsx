import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Img404 from './empty.png';
import styles from './index.less';

const Index: React.FC = () => {
    const history = useHistory();

    return <div className={styles['not-found']}>
        <img src={Img404} alt="" className={styles['img']} />
        <div className={styles['des']} onClick={() => history.push({ pathname: '/' })}>返回首页~</div>
    </div>

}
export default Index;