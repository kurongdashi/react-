import React, { useState } from 'react';
import { Form, Upload, Button } from 'antd';
const Index: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);

  const onChange = ({ fileList }) => {
    form.setFieldValue('cover', ['http://www.baidu.com']);
  };

  const customRequest = async (file) => {
    const values = await form.validateFields();
    console.log('values=', values);
  };
  const beforeUpload = (file) => {
    form.setFieldValue('cover', ['http://www.baidu.com']);
    return false;
  };
  const uploadProps = {
    maxCount: 4,
    listType: 'picture-card' as const,
    fileList,
    beforeUpload,
    onChange
  };
  return (
    <Form form={form}>
      <Form.Item label="图片" name="cover">
        <Upload {...uploadProps}>{fileList.length < 5 && '+ Upload'}</Upload>
      </Form.Item>
      <Form.Item label="图片">
        <Button onClick={customRequest}>提交</Button>
      </Form.Item>
    </Form>
  );
};
export default Index;
