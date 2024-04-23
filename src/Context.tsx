import { createContext } from "react";
/**
 * context 使用和redux store 差不多
 * 1、Context 需要使用createContext() 创建，此方法必须有一个defaultValue 入参
 * 2、Context对象里有一个Provider组件作为包裹层有一个必须props value=xxx
 * 3、useContext(prop) 入参为前面创建的Context对象
 *
 */

export default createContext({});
