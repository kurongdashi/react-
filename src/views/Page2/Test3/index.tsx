import React, { useEffect, useState } from 'react';
import { Button, Divider, Typography, Space } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

class Index extends React.Component {
  state = {
    isUpdate: false,
    count: 0
  };

  componentDidMount(): void {
    console.log('mount--');
  }
  componentWillUnmount(): void {
    console.log('unmount--');
  }
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log('DidUpdate--');
  }
  shouldComponentUpdate(
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    console.log('组件入参nextProps=', nextProps);
    console.log('组件当前nextState=', nextState);
    console.log('nextContext=', nextContext);
    return true;
  }

  render(): React.ReactNode {
    return (
      <div>
        <Title>深入了解react</Title>
        <Paragraph>
          <Title level={2}>生命周期</Title>
          <Space>
            <Button
              onClick={() => {
                this.setState((state: any) => {
                  state.count += 1;
                  return state;
                });
              }}
            >
              加1
            </Button>
            <span>计数结果：{this.state.count}</span>
          </Space>
        </Paragraph>
        <Divider></Divider>
        <Title level={2}>虚拟dom</Title>
        <Paragraph>
          react 将所有实际dom都转成虚拟dom(js
          内存对象)，当页面操作后进行diff算法，然后合并更新
        </Paragraph>
        <Title level={2}>diff算法</Title>
        <Paragraph>
          1、同层比较,如果一层节点不一样或不存在，则直接替换这个dom所在层及下子节点，相同则比较下一层（执行删除、创建、没有移动操作）
          2、同层list节点增加key标记，进行对比所以key应该是唯一id，进行移动、删除、插入操作{' '}
        </Paragraph>
        <Title level={2}>性能优化</Title>
        <Paragraph>
          1、react最消耗性能的是diff算法，所以需要减少，其中setState会触发算法，需要合并setState
          2、父组件的render会触发子组件的重新渲染，所以要在子组件中shouldComponentUpdate
          3、尽量使用隐藏节点，而不是删除节点的操作 4、避免使用forceUpdate
          因为会强制更新
        </Paragraph>
      </div>
    );
  }
}
export default Index;
