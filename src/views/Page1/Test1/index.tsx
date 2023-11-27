import React, { useEffect, useState } from 'react';
import { addAge, subAge } from '@/store/disptch'
import { connect } from 'react-redux'
import styles from './index.less'
const Index: React.FC = (props: any) => {
    const [page, setPage] = useState('');
    console.log('age=', props?.age)
    useEffect(() => {
        setPage('hello')
    }, [])
    const ageR = Math.random() * 100
    return <div>测试页面1--{page}
        <div className={styles['btns']}>
            <button onClick={() => props.addAge(1)}>年龄+1</button>
            <button onClick={() => props.addAge(Math.ceil(ageR))}>年龄加1~100随机数</button>
            <button onClick={() => props.subAge(1)}>年龄-1</button>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);