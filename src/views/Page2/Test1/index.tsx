import React, { useEffect, useState } from 'react';
import './test';
import { Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const Index: React.FC = () => {
  const [page, setPage] = useState('');

  useEffect(() => {
    setPage('hello');
  }, []);

  return (
    <Typography>
      <Title>js的loop轮询机制</Title>
      <Paragraph>1、先执行主线程代码，如果有异步任务则加入任务队列</Paragraph>
      <Paragraph>
        2、任务队列分为：
        <Text strong>宏任务(较大任务)队列包括 setTimeout ;</Text>
        <Text strong>
          微任务（较小任务）队列包括 Promise.then回调返回 DOM 变动观察器
        </Text>
      </Paragraph>
      <Paragraph>3、如果有微任务优先执行完后才执行宏任务</Paragraph>
    </Typography>
  );
};
export default Index;
