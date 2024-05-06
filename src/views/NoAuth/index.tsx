import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.less';
import { Button } from 'antd';

const Index: React.FC = () => {
  const history = useHistory();

  return (
    <div className={styles['not-found']}>
      <div className={styles['des']}>
        很抱歉你没有该页面的访问权限，{' '}
        <Button onClick={() => history.push({ pathname: '/' })}>
          可点击返回首页~
        </Button>
      </div>
    </div>
  );
};
export default Index;
