import React, { useEffect } from 'react';
import { Form, Button, Input, message } from 'antd';
import css from './index.less';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { update, asyncUpdate } from '@/store/disptch';
const Index = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const info: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const toHome = () => {
    const map = new URLSearchParams(location.search);
    const url = map.get('url');
    if (url) {
      return history.push(url);
    }
    return history.push('/home');
  };
  useEffect(() => {
    if (info.account) {
      return toHome();
    }
  }, [info.account]);

  const submit = async () => {
    debugger;
    try {
      const values = await form.validateFields();
      console.log('values', values);
      dispatch(asyncUpdate(values, toHome) as any);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={css.loginBox}>
      <Form form={form}>
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
