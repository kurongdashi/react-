import React, { useEffect, useState } from "react";
import { update } from "@/store/disptch";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.less";
const Index: React.FC = (props: any) => {
  const [page, setPage] = useState("");
  // hook 哦，不需要connect了
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("age=", props?.age);
  useEffect(() => {
    setPage("world");
  }, []);
  const ageR = Math.random() * 100;
  //   throw new Error('错误了~');

  return (
    <div>
      <div>
        用户信息：
        <div>姓名：{state.name}</div>
        <div>年龄：{state.age}</div>
        <div>账号：{state.account}</div>
      </div>
      <div className={styles["btns"]}>
        <button
          onClick={() =>
            dispatch(update({ name: "李四", age: 20, account: "abcd@qq.com" }))
          }
        >
          同步修改用户信息
        </button>
      </div>
      <div></div>
    </div>
  );
};
export default Index;
