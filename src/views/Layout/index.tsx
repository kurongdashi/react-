import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';
import routerConfig from '@/router';
interface Props {
    children: ReactNode;
}
/**
 * 公共布局
 * @param props
 * @returns
 */
const Index: React.FC<Props> = props => {
    const [page, setPage] = useState('');
    // console.log("styles=", styles)
    useEffect(() => {
        setPage('hello');
    }, []);
    return (
        <div className={styles['layout']}>
            <div className={styles['header-box']}>
                <Link to="/">
                    <span className={styles['title']}>系统后台</span>
                </Link>
            </div>
            <div className={styles['content-box']}>
                <div className={styles['slider-box']}>
                    {routerConfig.map((route, idx) => {
                        return (
                            <Link to={route.path} key={idx}>
                                <div className={styles['nav-item']}>{route.title}</div>
                            </Link>
                        );
                    })}
                </div>
                <div className={styles['right-box']}>
                    {/* 在主应用中增加子应用容器id */}
                    <div id="container"></div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
export default Index;
