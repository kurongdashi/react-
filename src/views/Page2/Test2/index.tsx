import React, { useEffect, useState } from 'react';
import { Button, Typography, Input, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const CryptoJS = require('crypto-js');
import JSEncrypt from 'jsencrypt';

const TextArea = Input.TextArea;
const Index: React.FC = () => {
  const [content, setContent] = useState('');
  const [bytes, setBytes] = useState(''); //加密后的内容
  const [bytes2, setBytes2] = useState(''); //解密后的内容

  const [bytesRSA, setBytesRSA] = useState(''); //非对称加密后的内容
  const [bytesRSA2, setBytesRSA2] = useState(''); //非对称解密后的内容
  const jsEncrypt = new JSEncrypt();
  // 从http://web.chacuo.net/netrsakeypair 生成公钥私钥
  const key = 'hello',
    publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvYxvxZ/YLXyNFTFzpQPe
    bFPpXXZnW3Rr4g7PiBZ+PvZvPuNdHEE+9i2CpQS8aO0iMfzkxWr8PFAdMMpIttle
    tben33+7gzig2UyD6UvCKdxnG3SnPpMcRpqaAbCxaS92U/D64kTs+Bq4IYXIMzSe
    0vGWDLGL1Kv7JV+uzpGWiTAP6GNO5XUDgJVqyKLgO5ZLca1Txb7Wg0JRnENaaP5Y
    ZcSUJlRqHK+tBYOxNSiLvZUEGOxGnCGJHkP+p7JzquFGakpzlWDDKAAuHN1u6gnV
    F6FRE3yY4aUJP0t0ypPD9ZOOGB57uddvQmWPEEt4RFopyung6JS/JAJlWcxVkOFy
    JwIDAQAB`,
    privateKey = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9jG/Fn9gtfI0V
    MXOlA95sU+lddmdbdGviDs+IFn4+9m8+410cQT72LYKlBLxo7SIx/OTFavw8UB0w
    yki22V61t6fff7uDOKDZTIPpS8Ip3GcbdKc+kxxGmpoBsLFpL3ZT8PriROz4Grgh
    hcgzNJ7S8ZYMsYvUq/slX67OkZaJMA/oY07ldQOAlWrIouA7lktxrVPFvtaDQlGc
    Q1po/lhlxJQmVGocr60Fg7E1KIu9lQQY7EacIYkeQ/6nsnOq4UZqSnOVYMMoAC4c
    3W7qCdUXoVETfJjhpQk/S3TKk8P1k44YHnu5129CZY8QS3hEWinK6eDolL8kAmVZ
    zFWQ4XInAgMBAAECggEBALbwl9/Qyj/8ed3+gHK/LSi4Q/8ki9TEpGrliH771pTG
    G9BCeFcQ0cefXPwPehh65goA3nt7Kj67w7CXS17OpI4V1zvqd/vJ59RR+O5tY9Qr
    GIhzKgdGzH+ILyN6eX/fgwC5ECraAyvh/dy81eA15SQKbpuJsD9uTVJg6sIL2ZJE
    2goNBSglBMpkaPu0qxVZII2Ot/rqO4kLqKVY+y3BUcrd75IFonwtugLAMDQjUQ9U
    Z3jubHY9aDzX6Q38l+DQWAey6Q8NB3R9xJ+K36y+u+xKa0kH4LTg7xQASVXCZDXY
    t1SL/xyAUf/bCVQT15ClOR4G9gOYDoeJ4XgNZZZAmOECgYEA8CKdlgl4ADgBr2ai
    gZaGXz5TncgpgCgOISMYHVVcR/uRJSyg336Cgm04zn2HLIpXI++zcmECuE3oKKXF
    g6GKcjTxAuEmMfKogeQYU9wWqi1Lb18q+yzbbOseL6y//prU9J2uboZr2aVcG0UK
    I++5N8TaW0JcdM5ozkZcc8+H6q0CgYEAyhJBBbiS32DS2zGzzLUB+d6eefh1ZvxK
    LwMgdFXo4KfqUCrhGIqWLUvrSuTAav3LkYZNYjlMs7qds8J5LV8oQ+4Sk7adx9+I
    4iiuDi+EPIh+nYzN6ObrPF8fkYmZlDP72tAU06VtTnoxjFckNNtV/5fgZSWvc1fh
    h+o9dkbJ3qMCgYEAioDss6Uyea3UCv7/rA7N4hFo2RCiHzD7NVGwjvq1By+qP+7F
    uyKU0/V7Vl5AoQgJyshukAI0N2l4BjnW+l0qJUUz3Z1PEnALkR+miHfg+ra1U79o
    Ywc0aFYUSxswggF74rsv6L/PZPFjdrcTajbSdcAs0YYtHZIQESm0GXgRxOECgYBi
    VhHIi/MFu+PBAeYC589nXtv2dWAE1x/u0vG3S5uBwJV5n/Rc8gx1TK3bi4jMSGgJ
    kLcV5taZ3GYkda5s0xMQQ8pMkiEkhHbjwHI7uwn6P16Go2ANSFsPzSbat4DCq62T
    5ZFNEgMonrSAHGQlSNwH/0wXTQid9BVwBCEW7woMSwKBgC/cofmMDEkdDc6swV8+
    omsN+heLZsiZNjmlOZ1mkDMMOOWwJsHYkPkg1oP58oFeZ0NvJ8BegOYT1q8aCWBt
    Hrjmo380gR4bTokCYH5BO/7cPhRWtJG2nsK98bEmuBBEQcIq6k3RgEyGUkgSjyQ8
    IdP1aQWg8phisYzkEGGZPvqw`;
  jsEncrypt.setPublicKey(publicKey);
  jsEncrypt.setPrivateKey(privateKey);
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
  const enCryptRSA = (content: any) => {
    if (content) {
      const obj = jsEncrypt.encrypt(content);
      return obj.toString();
    }
    return content;
  };
  const deCryptRSA = (content: any) => {
    if (content) {
      const obj = jsEncrypt.decrypt(content);
      return obj.toString();
    }
    return content;
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
        <Title>jsEncrypto的RSA加解密</Title>
        <div>非对称加解密使用公钥解密使用一个秘钥</div>
        <Button
          onClick={() => {
            setBytesRSA(enCryptRSA(content));
          }}
        >
          加密
        </Button>
        <TextArea onChange={e => setContent(e.target.value)} cols={3} />
        <div>加密后的内容：{bytesRSA}</div>
      </div>
      <Button
        onClick={() => {
          setBytesRSA2(deCryptRSA(bytesRSA));
        }}
      >
        解密
      </Button>
      <div>加密后的内容：{bytesRSA2}</div>
    </div>
  );
};
export default Index;
