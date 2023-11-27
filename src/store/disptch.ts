import { Action, ActionType } from './reducer'
// 定义 action方法,只能通过action去修改state
export const addAge = (num: number): Action => {
    return {
        type: ActionType.ADD,
        data: { age: num },
    }
}
export const subAge = (num: number): Action => {
    return {
        type: ActionType.SUB,
        data: { age: num },
    }
}
export const update = (data: any): Action => {
    return {
        type: ActionType.UPDATE,
        data,
    }
}
// 如果需要action 支持异步获取数据,action 返回一个函数，则需要使用redux-thunk 中间件
// 
export const asyncUpdate = () => {
    return (dispatch: any) => {
        dispatch(update)
    }
}