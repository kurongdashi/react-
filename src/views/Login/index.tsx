import React from 'react';
import { Form, Button, Input, message } from 'antd';
import css from './index.less';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { update, asyncUpdate } from '@/store/disptch';
const Index = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const submit = async () => {
        debugger;
        try {
            const values = await form.validateFields();
            console.log('values', values);
            dispatch(asyncUpdate(values, history) as any);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={css.loginBox}>
            <Form form={form}>
                <Form.Item label="账号" name="account" rules={[{ required: true, message: '请输入账号' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
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
