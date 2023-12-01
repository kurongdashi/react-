import React, { useEffect, useState } from 'react';
import { addAge, subAge } from '@/store/disptch';
import { connect } from 'react-redux';
import styles from './index.less';
import { DatePicker, FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
const Index: React.FC = (props: any) => {
  const [page, setPage] = useState('');
  console.log('age=', props?.age);
  useEffect(() => {
    setPage('hello');
  }, []);
  const ageR = Math.random() * 100;
  const onChange = val => {
    console.log('日期=', val?.format('YYYY-MM-DD HH:mm:ss'));
  };
  return (
    <div>
      测试页面1--{page} <DatePicker onChange={onChange} />
      <div className={styles['btns']}>
        <button onClick={() => props.addAge(1)}>年龄+1</button>
        <button onClick={() => props.addAge(Math.ceil(ageR))}>
          年龄加1~100随机数
        </button>
        <button onClick={() => props.subAge(1)}>年龄-1</button>
      </div>
      <FloatButton
        onClick={() => console.log('点击悬浮按钮')}
        shape="circle"
        icon={<CustomerServiceOutlined />}
      ></FloatButton>
    </div>
  );
};
const mapStateToProps = (state: any) => ({ ...state });
const mapDispatchToProps = (disptch: any) => {
  return {
    addAge(num: any) {
      return disptch(addAge(num));
    },
    subAge(num: any) {
      return disptch(subAge(num));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
