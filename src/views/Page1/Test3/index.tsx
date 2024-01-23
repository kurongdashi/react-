import React, { useEffect, useState, DOMAttributes } from 'react';
import MyButton from '@/components/MyButton';
import '@/components/MyButton';
type CustomeElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['hello-world']: CustomeElement<MyButton>;
        }
    }
}
const Index: React.FC = (props: any) => {
    const [hello, setHello] = useState('zhangsan');
    const myClick = () => {
        console.log('zou=====');
    };
    return (
        <div>
            <hello-world text={hello} onCustomClick={myClick}></hello-world>
        </div>
    );
};
export default Index;
