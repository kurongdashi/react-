import { Action, ActionType } from './reducer';
import request from '../utils/request';
// 定义 action方法,只能通过action去修改state
export const addAge = (num: number): Action => {
    return {
        type: ActionType.ADD,
        data: { age: num }
    };
};
export const subAge = (num: number): Action => {
    return {
        type: ActionType.SUB,
        data: { age: num }
    };
};
export const update = (data: any): Action => {
    return {
        type: ActionType.UPDATE,
        data
    };
};
// 如果需要action 支持异步获取数据,action 返回一个函数，则需要使用redux-thunk 中间件
export const asyncUpdate = (data: any, history: any) => {
    return (dispatch: any, getState: any) => {
        // const state = getState();
        // 获取state
        console.log('异步登录data=', data);
        return request({
            url: '/api/login',
            method: 'POST',
            data: data
        }).then(res => {
            if ((res as any).code == 200) {
                dispatch(update(res.data));
                history.push('/home');
            }
        });
    };
};
