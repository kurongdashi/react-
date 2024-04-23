import Mock from "mockjs";
// 引入此文件即开启mock 拦截请求
Mock.mock("/api/getformData", {
  "list|1-10": [
    {
      "string|1-19": "aa",
      "number|1-100": 30,
    },
  ],
});
Mock.mock("/api/getTableInfo", {
  "list|1-10": [
    {
      name: "@cname",
    },
  ],
});

Mock.mock("/api/login", "post", {
  code: 200,
  msg: "登录成功",
  data: {
    token: "kjkjalsdiiuioayeuryqowierqiwerqowiery",
    name: "张三丰",
    age: 100,
    account: "136599@qq.com",
    permission: ["/home", "/page1/test1", "/page2/test1"],
  },
});
