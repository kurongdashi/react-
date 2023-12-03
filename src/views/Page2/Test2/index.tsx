import React, { useEffect, useState } from 'react';
import { Button, Typography, Input, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const CryptoJS = require('crypto-js');
const TextArea = Input.TextArea;

const Index: React.FC = () => {
  const [content, setContent] = useState('');
  const [bytes, setBytes] = useState(''); //加密后的内容
  const [bytes2, setBytes2] = useState(''); //解密后的内容
  const [bytesP, setBytesP] = useState(''); //非对称加密后的内容
  const [bytesP2, setBytesP2] = useState(''); //非对称解密后的内容
  const key = 'hello',
    publicKey = 'public',
    privateKey = 'private';
  const enCrypt = (content: string, key: string) => {
    if (content && key) {
      // AES DES 对称加密
      const obj = CryptoJS.AES.encrypt(content, key);
      return obj.toString();
    }
    return null;
  };
  const deCrypt = (content: string, key: string) => {
    if (content && key) {
      const obj = CryptoJS.AES.decrypt(content, key);
      return obj.toString(CryptoJS.enc.Utf8);
    }
    return null;
  };
  const enCrypt2 = (content: string, key: string) => {
    if (content && key) {
      const obj = CryptoJS.RSA.encrypt(content, key);
      return obj.toString();
    }
    return null;
  };
  const deCrypt2 = (content: string, key: string) => {
    if (content && key) {
      const obj = CryptoJS.RSA.decrypt(content, key);
      return obj.toString(CryptoJS.enc.Utf8);
    }
    return null;
  };

  return (
    <div>
      <Title>crypto-js的加解密</Title>

      <div>
        <div>对称加解密使用一个秘钥</div>
        <Button
          onClick={() => {
            setBytes(enCrypt(content, key));
          }}
        >
          加密
        </Button>
        <TextArea onChange={e => setContent(e.target.value)} cols={3} />
        <div>加密后的内容：{bytes}</div>
      </div>
      <Button
        onClick={() => {
          setBytes2(deCrypt(bytes, key));
        }}
      >
        解密
      </Button>
      <div>加密后的内容：{bytes2}</div>
      <div>
        <Divider></Divider>
        <div>非对称加解密使用公钥解密使用一个秘钥</div>
        <Button
          onClick={() => {
            setBytesP(enCrypt2(content, publicKey));
          }}
        >
          加密
        </Button>
        <TextArea onChange={e => setContent(e.target.value)} cols={3} />
        <div>加密后的内容：{bytesP}</div>
      </div>
      <Button
        onClick={() => {
          setBytesP2(deCrypt2(bytes, privateKey));
        }}
      >
        解密
      </Button>
      <div>加密后的内容：{bytesP2}</div>
    </div>
  );
};
export default Index;
