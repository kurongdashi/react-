export enum ActionType {
  ADD = 'ADD',
  SUB = 'SUB',
  UPDATE = 'UPDATE'
}
interface ActionData {
  [key: string]: any;
}
export interface Action {
  type: ActionType;
  data: ActionData;
}

let initialState: any = {};
if (sessionStorage.info) {
  initialState = JSON.parse(sessionStorage.info);
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
export default reducer;
