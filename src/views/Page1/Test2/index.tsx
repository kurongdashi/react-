import React, { useEffect, useState } from 'react';
import { addAge, subAge, update, asyncUpdate } from '@/store/disptch'
import { connect } from 'react-redux'
import styles from './index.less'
const Index: React.FC = (props: any) => {
    const [page, setPage] = useState('');
    console.log('age=', props?.age)
    useEffect(() => {
        setPage('world')
    }, [])
    const ageR = Math.random() * 100;

    return <div>
        <div>
            用户信息：
            <div>姓名：{props.name}</div>
            <div>年龄：{props.age}</div>
            <div>账号：{props.account}</div>
        </div>
        <div className={styles['btns']}>
            <button onClick={() => props.updateInfo({ name: '李四', age: 20, account: 'abcd@qq.com' })}>同步修改用户信息</button>
            <button onClick={() => props.asyncUpdate()}>登录获取用户信息</button>
        </div>
        <div>
        </div>
    </div>

}
const mapStateToProps = (state: any) => ({ ...state })
const mapDispatchToProps = (disptch: any) => {
    return {
        addAge(num: any) {
            return disptch(addAge(num))
        },
        subAge(num: any) {
            return disptch(subAge(num))
        },
        updateInfo(info: any) {
            return disptch(update(info))
        },
        asyncUpdate() {
            return disptch(asyncUpdate())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);