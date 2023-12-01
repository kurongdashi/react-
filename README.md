# 1、项目搭建顺序
[参考搭建]（https://blog.csdn.net/qq_41581588/article/details/129177415）
- 安装yarn `npm i yarn -g`
## 安装基础依赖 
### 安装打包工具 `yarn add webpack webpack-cli webpack-dev-server webpack-merge cross-env`
- webpac 包含基础API
- webpack-cli 可以提供命令行 再package.json 中使用 webpack --config 等命令
- webpack-dev-server 可以启动一个热更新本地服务
- cross-env 可以再运行webpack 时设置环境变量 cross-env NODE_ENV=pro

- 安装打包配置项所需依赖 `yarn add clean-webpack-plugin html-webpack-plugin`
- html-webpack-plugin 自动生成html
- clean-webpack-plugin 每次运行前清除dist

- 安装样式处理所需依赖 `yarn add less-loader less css-loader style-loader postcss-loader postcss-preset-env`
- less 提供less语法
- less-loader 处理less
- css-loader 可以处理css
- postcss-loader 可以自动给样式添加前缀
- postcss-preset-env 搭配postcss-loader 使用
- style-loader 可以将 css 以 <style> 标签形式插入html

- 安装图片处理所需依赖 `yarn add file-loader`
- file-loader 可以压缩图片

- 安装react 所需依赖 `yarn add react react-dom reacr-router-dom @types/react @types/react-dom @types/react-router-dom typescript ts-loader`
- react-dom 支持jsx
- react-router-dom 支持路由
- typescript 提供语法支持
- ts-loader 处理.ts、.tsx 文件
- tsconfig.json ts配置项
[tsconfig配置]（https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#基础）


- 安装JS处理 所需依赖 `yarn add @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react @babel/plugin-transform-runtime`
babel-loader 识别
@babel/preset-react react转js
@babel/preset-typescript ts转js
@babel/preset-env 搭配babel 使用 转化普通语法
@babel/plugin-transform-runtime 将es6 高级语法转化

```
// .babelrc 文件配置项
{
    "presets": [
        "@babel/preset-react",
        "@babel/preset-env",
        "@babel/preset-typescript"
    ],
    "plugins": ["@babel/plugin-transform-runtime"]

}
```

- 安装eslint 实现代码校验及自动格式化代码 `yarn add --dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier prettier`
eslint-config-prettier prettier 格式化
eslint eslint-plugin-react eslint-plugin-react-hooks 校验
[eslint配置](http://eslint.cn/docs/rules/)

```
vscode 配置 安裝prettier 插件
settings =>format on save => 勾选上
settings => editor default format => 选择 prettier
查看setting.json 配置如下
"editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
项目下.repttierrc 优先级最高 
// .repttierrc.js（json） 配置 
{
  "printWidth": 100,	//每行最多显示的字符数
  "tabWidth": 2,//tab的宽度 2个字符
  "useTabs": false,//禁止使用tab代替空格
  "semi": true,//结尾使用分号
  "singleQuote": true,//使用单引号代替双引号
  "trailingComma": "none",//结尾是否添加逗号
  "bracketSpacing": true,//对象括号俩边是否用空格隔开
  "bracketSameLine": true,;//组件最后的尖括号不另起一行
  "arrowParens": "always",//箭头函数参数始终添加括号
  "htmlWhitespaceSensitivity": "ignore",//html存在空格是不敏感的
  "vueIndentScriptAndStyle": false,//vue 的script和style的内容是否缩进
  "endOfLine": "auto",//行结尾形式 mac和linux是\n  windows是\r\n 
  "singleAttributePerLine": false //组件或者标签的属性是否控制一行只显示一个属性
  "jsxBracketSameLine": true, // 将JSX标签放在同一行（推荐）  

}

```
[prettier如何配置](https://blog.csdn.net/qq_41887214/article/details/132391992)
- 同时在vscode 中勾选 format on save


- 安装 `yarn add portfinder --dev` 本地启动时如果端口被占用，则返回一个新端口
```
portfinder.basePort = PORT;
const port = await portfinder.getPortPromise();
devConfig.devServer.port = port;
```

## 项目使用

- 使用BrowserRouter时本地需要配置
```
output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name][hash:6].js",
        // 本地BrowserRouter 配置将请求路径转发的 index.html
        publicPath: '/',
    },
 devServer: {
        // 启用history API 路由不存在时返回 index.html
        historyApiFallback: true,
     }

```
[BrowserRouter使用](https://blog.csdn.net/wuyujin1997/article/details/111937956)

- types.d.ts 使用在项目中需要定义图片、less、等自定义模块，否则typescript会找不到类型

在tsconfig.json 中如下配置
```
 // 声明文件所在目录 对应 src/types/types.d.ts d.ts是固定后缀
        "typeRoots": [
            "./src/types",
            "./node_modules/@types"
        ],
```


- redux 的使用 `yarn add redux react-redux redux-thunk`
- 创建store provider 
```
import { createStore } from 'redux';
import reducer from '@/store/reducer'
import { Provider } from 'react-redux'

const store = createStore(reducer);
// 做 provider 层
const root = createRoot(document.getElementById('root') as any)
root.render(<Provider store={store}>
    <Entry />
</Provider>);
```

- 使用中间件，可在dispatch 之前做一些操作,`yarn add redux-thunk `
```
import { createStore, applyMiddleware, combineReducers } from 'redux';
// 使用applyMiddleware 中间件，可以支持action 返回一个方法
const store = createStore(reducer, applyMiddleware(thunk));

// 允许action 返回一个函数，在函数内可进行异步操作
export const asyncUpdate = () => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        // 获取state
        console.log('state=', state)
        request({
            url: '/api/login',
            method: 'POST',
        }).then((res) => {
            if ((res as any).code == 200) {
                dispatch(update(res.data))
            }
        })
    }
}
```
[redux使用](https://blog.csdn.net/m0_68324632/article/details/128819264)
[redux中间件的理解](https://zhuanlan.zhihu.com/p/200775480)

- 使用mockjs `yarn add mockjs @types/mockjs --dev`
```
// src/mock/index.ts 在入口处引用此
import Mock from 'mockjs';
// 引入此文件即开启mock 拦截请求
Mock.mock('/api/getformData', {
    "list|1-10": [
        {
            "string|1-19": 'aa',
            "number|1-100": 30,

        }
    ]
})

```
[mockjs使用](https://blog.csdn.net/TKY666/article/details/126215513)



### 微前端实现方案 在主应用中，通过使用微前端框架（如single-spa、qiankun等）来加载和管理子应用。
[微前端实现方案参考](https://www.jianshu.com/p/0ac8e1a666cf)
[single-spa](https://zh-hans.single-spa.js.org/docs/getting-started-overview/)
[qiankun](https://qiankun.umijs.org/zh/guide)


### 文档参考
[react-route-dom](https://reactrouter.com/en/dev/upgrading/v5)
[webpack](https://webpack.docschina.org/configuration/devtool/#root)
[typescript]（https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#基础）

