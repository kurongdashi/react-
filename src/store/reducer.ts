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
const initialState: any = {};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
export default reducer;
