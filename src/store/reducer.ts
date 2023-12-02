export enum ActionType {
    ADD = "ADD",
    SUB = "SUB",
    UPDATE = "UPDATE",
}
interface ActionData {
    [key: string]: any;

}
export interface Action {
    type: ActionType;
    data: ActionData;
}
const initialState = {
    name: '张三',
    age: 30,
    account: '123456@qq.com',
}


const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD:
            const age = state.age + action.data.age;
            return { ...state, age };
        case ActionType.SUB:
            const age1 = state.age - action.data.age;
            return { ...state, age: age1 };
        case ActionType.UPDATE:
            return { ...state, ...action.data };
        default:
            return state;
    }

}
export default reducer;