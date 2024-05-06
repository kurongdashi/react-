# 1、项目搭建顺序

[参考搭建]（https://blog.csdn.net/qq_41581588/article/details/129177415）

- 安装yarn `npm i yarn -g`

## 安装打包工具 `yarn add webpack webpack-cli webpack-dev-server webpack-merge cross-env`

## 打包文件处理

- webpac 包含基础API
- webpack-cli 可以提供命令行 再package.json 中使用 webpack --config 等命令
- webpack-dev-server 可以启动一个热更新本地服务
- cross-env 可以再运行webpack 时设置环境变量 cross-env NODE_ENV=pro，变量注入到process.env中
- dotenv 可以读取.env文件里的配置注入到process.env中，用于根据环境修改webpack配置
- process.env.NODE_ENV 值默认等于webpack mode

```js
// 执行加载命令后，读取配置文件中的环境变量，注入process.env中
require('dotenv').config({ path: './env' });
// .env
PUBLIC_PATH = 'http://www.xxx';
```

## 打包文件插件

- 安装打包配置项所需插件依赖 `yarn add clean-webpack-plugin html-webpack-plugin`
- html-webpack-plugin 自动生成html
- clean-webpack-plugin 每次运行前清除dist，webpack5中被output.clean=true,取代
- min-css-extract-plugin css提取单独文件
- progress-bar-webpack-plugin 打包时显示进度
- copy-webpack-plugin 打包时可拷贝文件
- webpack-merge webpack配置文件合并，多个环境不同配置可抽离公共部分
- portfinder 在启动webpack server 时如果当前端口被占用则返回新的端口
- optimize-css-assets-webpack-plugin css 压缩（旧）
- Css-Minimizer-Webpack-Plugin css 压缩（新）
- workbox-webpack-plugin 当断网时也能访问网站，原理打包时本地生成一个service-worker.js缓存了网络资源

- zip-webpack-plugin 打包后压缩dist (可选)
- webpack-bundle-analyzer 打包后文件大小分析(本地开发)

## 样式处理

- 安装样式处理所需依赖 `yarn add less-loader less css-loader style-loader postcss-loader postcss-preset-env`
- less 提供less语法
- less-loader 处理less
- css-loader 可以处理css
- postcss-loader 可以自动给样式添加前缀
- postcss-preset-env 搭配postcss-loader 使用
- autoprefixer 在postcss-loader 中配置，自动增加css兼容前缀
- style-loader 可以将 css 以 `<style>` 标签形式插入html（慎用）

- 安装图片处理所需依赖 `yarn add url-loader`
- url-loader 可以压缩图片,url-loader内部已经依赖会自动调用file-loader

```js
// postcss-loader 配置
{
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    // 自动添加css前缀
                    plugin: [
                      // css 加浏览器兼容前缀
                      'autoprefixer',
                      // 帮助找到package.json 里的browserslist 配置作用兼容浏览器
                      'postcss-preset-env'
                    ]
                  }
                }
              },
```

## 处理js,高阶语法，和模版语法

- 安装JS处理 所需依赖 `yarn add @babel/preset-typescript @babel/preset-react @babel/plugin-transform-runtime`
- babel-loader webpack+babel组合，内部包括了@babel/core(AST转换) ，@babel-preset-env (部分js转换：箭头函数，class)
- @babel/preset-react react转js
- @babel/preset-typescript ts转js
- @babel/preset-env 浏览器环境兼容,转化普通语法
- @babel/plugin-transform-runtime 将es6 高级语法转化并将公共代码抽离减少重复逻辑，减少代码体积
- core-js 内置了es5模拟E6+的Promise，map等对象，外部使用时自己转为使用core-js的内置对象

- @babel/preset-react-app 包含了上面的所有预设，只需引入一个

```json
// .babelrc 文件配置项
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        // 配置 core-js
        "useBuiltIns": "usage",
        "core-js": "3"
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

## webpack 优化方案

- devtool/source-map
- HMR/热替换 默认只会对css有用， `react-hot-loader`对js模块热替换
- Rule.oneOf 包裹所有rule规则，类似Switch只使用一种规则
- Rule.include/exclude 缩小JS打包规则范围
- babel/cache 主要是对js
- thead-loader 对js打包和压缩开启，压缩需要使用内置插件terser-webpack-plugin
- tree-shaking
- 图片压缩
- preload/prefetch 插件对懒加载的资源进行预加载
- optimization
  - splitChunks
  - 模块间依赖关系抽取为 runtimeChunk（将hash值），解决：一个被依赖模块改变而引发主文件hash改变
- babel配置core-js , babel/core只能处理部分js高级语法(箭头函数，class)，core-js能处理Promise，async,Array.includes等语法转为es5

```js
// runtime~main.js 将依赖的hash单独保存到一个文件中，即时依赖模块改变，也只会引发runtime的改变，不会引发main改变
return (
  'js/' +
  (177 === e ? 'home' : e) +
  '.' +
  {
    127: 'ae320a',
    177: '5ec1c8',
    445: '7927e2',
    612: '10c2ec',
    716: '0cb636',
    845: 'c54b8b',
    870: 'fb076a',
    952: 'e4e866'
  }[e] +
  '.chunk.js'
);
```

## 代码规范 eslint

### vscode 需要安装eslint+perttier插件

- [prettier如何配置](https://blog.csdn.net/qq_41887214/article/details/132391992)
- 安装eslint 实现代码校验及自动格式化代码 `yarn add --dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier prettier`
- prettier 代码格式化能力提供者
- eslint 代码检查能力提供者
- eslint-config-prettier 关闭eslint和prettier有冲突的配置
- eslint-plugin-prettier 调用prettier，可以让eslint继承rules
- eslint-plugin-vue vue语法检查
- eslint-plugin-react react语法校验
- eslint-plugin-react-hooks hooks校验
- eslint-plugin-import 动态导入校验
- @typescript-eslint/parser eslint中的ts解析器
- @typescript-eslint/eslint-plugin ts语法校验
  [eslint配置](http://eslint.cn/docs/rules/)

### 在项目项创建.vscode目录，并创建settings.json文件，来控制perttier插件

```js
// .vscode/setting.json 配置如下
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
// 项目下文件优先级.repttierrc > .repttierrc.config.js> .repttierrc.js
// .repttierrc（json） 配置
{
  "printWidth": 100,	//每行最多显示的字符数
  "tabWidth": 2,//tab的宽度 2个字符
  "useTabs": false,//禁止使用tab代替空格
  "semi": true,//结尾使用分号
  "singleQuote": true,//使用单引号代替双引号
  "trailingComma": "none",//结尾是否添加逗号
  "bracketSpacing": true,//对象括号俩边是否用空格隔开
  "bracketSameLine": true,//组件最后的尖括号不另起一行
  "arrowParens": "always",//箭头函数参数始终添加括号
  "htmlWhitespaceSensitivity": "ignore",//html存在空格是不敏感的
  "vueIndentScriptAndStyle": false,//vue 的script和style的内容是否缩进
  "endOfLine": "auto",//行结尾形式 mac和linux是\n  windows是\r\n
  "singleAttributePerLine": false //组件或者标签的属性是否控制一行只显示一个属性
  "jsxBracketSameLine": true, // 将JSX标签放在同一行（推荐）
}

// .eslintrc
{
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',//hook规则
        'plugin:typescript-eslint/recommended',//ts 规则
        'plugin:prettier/recommended',
        'prettier'
    ],
    plugins: ['react', 'react-hooks', 'prettier'],
    // 解析器1 > 解析器2
    parser:'@typescript-eslnt/parser',
    // 解析器配置
    parserOptions: {
        // 解析器2
        parser:'@typescript-eslnt/parser',
        ecmaVersion: 2021,//解析es版本，可选latest最新
        sourceType: 'module',//解析模式 esmodule
    },
    // 工作环境
    env: {
        browser: true,//浏览器
        es6: true,//es
        node: true,//支持node
    },
    rules: {
        'prettier/prettier': 'error', // 使用Prettier来格式化代码，设置为error级别以确保代码格式化
        'react/display-name': 'off', // 禁用React的display-name规则（如果需要可以随时开启）
        'react/prop-types': 'off', // 禁用React的prop-types规则（如果需要可以随时开启）
        'react/state-in-constructor': 'off', // 禁用React的state-in-constructor规则（如果需要可以随时开启）
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // 指定React文件扩展名（对于TypeScript文件）
        'react-hooks/rules-of-hooks': 'error', // 确保遵循React Hooks的规则（例如，只在effect使用useState）
        'react-hooks/exhaustive-deps': 'warn' // 对依赖项的检查，如果有不完整的依赖项，会发出警告（例如，当useEffect更改某些状态时）
    }
}

```

## stylelint 样式检查器

- 安装`npm i stylelint stylelint-config-html stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard         stylelint-config-standard-scss stylelint-config-recess-order postcss postcss-html stylelint-config-prettier -D
`
- 安装vscode stylelint插件

## editconfig 帮助在不同编译器下控制代码规范

- 安装vscode editconfig 插件
- 创建.editorconfig文件

```
# http://editorconfig.org
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
indent_style = tab # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
max_line_length = 130 # 最大行长度

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪

```

## git提交规范

### eslint 命令行配置**所有命令结尾必须指定目录,或者文件路径**

```
当使用eslint.config.js 等配置文件时，结尾可使用.代表全部文件
--fix dir/xx.js 修复
--ext xxx 指定扩展名默认只检查.js文件，一般需要指定
--config 指定eslint配置文件
--ignore-path 指定忽略文件配置
--cache 缓存被检查过的文件，方便下次仅检查更改的文件提高效率
--format json 指定控制台输出错误格式(不常用)

```

### prettier 命令行配置**所有命令结尾必须指定目录,或者文件路径**

```
.代表全部文件
--write xx 修复
--check xx 检查不修复,会在控制台打印检查结果
```

### husky 拦截git 提交配置hooks

- lint-stagee 检查git add 过的代码；提交前校验并使用prettier格式化 `npx husky add .husky/pre-commit "npx lint-staged"`
- @commitlint/cli 校验提交描述信息是否规范 `npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`
- @commitlint/config-conventional 标准配置，可以在自定义commitlint中继承此
- commitizen 生成标准的提交描述信息
- cz-git 输出commitizn
- [文档参考](https://blog.csdn.net/du_aitiantian/article/details/130326158)

```json
// 创建.husky/pre-commit 文件并添加命令
npx lint-staged
// 创建.husky/commit-msg 文件并添加命令
npx --no-install commitlint --edit "$1"
//--- pacakage.json 此配置husky已废弃只能使用配置文件去配置
{

  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config ./scripts/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./scripts/webpack.prod.js",
    "eslint":"eslint --fix --ext .js,jsx,ts,tsx src/",//指定扩展名，不然只检查.js，指定目录缩小检查范围
    "prettier":"prettier --check .",
    "lint-staged":"lint-staged"
  },
  "lint-staged": {
    "*.{jsx,js,tsx,ts,css,less,json,md}": [
      "eslint --fix",
      "prettier --write"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}
```

## tsconfig

- 编译入口： include,exclude
- 解析规则：moduleResolution(模块解析)->types/typeRoots(声明配置)->baseUrl/paths(基础配置)

```json
{
  "compilerOptions": {
    "target": "ES5", //编译为es5
    "module": "commonJs", //输出模块类型
    "esModuleInterop": true, //允许使用es6 导入导出
    "skipLibCheck": true, //跳过lib检查
    "jsx": "react", //types 使用jsx
    "moduleResolution": "node", //模块解析规则，node：从node_modules/查找，classic从当前目录逐层往外找，
    // "baseUrl": "./", //默认./,可以不配置； 扩展moduleResolution 解析规则，当上面的规则不能找到时，从baseUrl
    // 基于baseUrl路径，其他声明文件所在目录 对应 src/types/types.d.ts d.ts是固定后缀
    "typeRoots": ["./src/types", "./node_modules/@types"],
    // "types": ["self"], // 搭配typeRoots 使用，指定要引入的模块，可以不配置
    "paths": {
      "@/*": ["src/*"] // 配置路径别名让ts支持 和webpack里同步
    }
  },
  "include": ["./src/**/*"], //需要编译的目录，** 任意目录，* 任意文件
  "exclude": ["self", "test.ts"] //用于排除include中的某些目录，或者文件
}
```

## 项目使用

### webpack 模块联邦实现

- 所有子应用都可以暴露出需要共享的组件，也可以引用其他应用暴露的组件（去中心化）
- 对比qiankun的基于中心化方式，更加有利用协同开发共享组件，qiankun更适合加载子项目，而非组件

```js
// 基于ModuleFederationPlugin 实现
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports={
  entry:'./src/index.tsx',
  // entry:'./src/entry.js',// 如开启shard共享公共组件库则必须使用
  output:{
    // publicPath:'/',//publicPath 如果配置 会和模块联邦有冲突，导致子应用无法正常加载共享组件，加载地址会被替换为自己localhost
    publicPath:'auto',//模块联邦推荐publicPath 使用auto
  }
  ...
  plugins:[
    new ModuleFederationPlugin({
      name: 'app1',//应用名称
      filename: 'remoteEntry.js',//输出组件的的入口文件名称
        // 引用的远程模块，key(模块名称)- value(远程应用名称@远程地址+远程入口文件)
      remotes: {
        app2Module: `app2@http://localhost:8002/remoteEntry.js`
      }
      // 暴露组件，key-value,如果组件中使用了antd等第三方公共库必须，开启shard
      exposes: {
        './MyButton': './src/MyButton'
      }
      // 是否需要共享公共组件库，如果共享那么在index.tsx 必须抽离出一个promise文件做为入口
      // shared: ['react', 'antd']
    })
  ]
}
// entry.js 通过读取index.tsx入口,返回promise 来实现shard 组件共享
import('./index')

// App.tsx 使用远程组件，必须import('app1Module/MyButton') 异步加载组件

const MyButton = React.lazy(() => import('app1Module/MyButton'));
// 或者
const  MyButton = await import('app1Module/MyButton');


```

### qiankun + 模块联邦

- qiankun 会加载带有entry 标记的script标签内容，或者加载最后一个script [使用问题](https://qiankun.umijs.org/zh/faq)

```js
// 子应用APP2 使用模块联邦会默认将remoteEntry.js在放在最后script加载
 <script defer src="js/main5c5083.js"></script><script defer src="remoteEntry.js"></script></head>

// 需要 会加载带有entry 标记的script标签内容，或者加载最后一个script
  new htmlWebpackPlugin({
      title: 'app2应用',
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: ['main'],//手动调整script 加载顺序
    }),
// entry.js 入口需要修改
import('./index');
export const bootstrap = () => promise.then(m => m.bootstrap());
export const mount = () => promise.then(m => m.mount());
export const unmount = () => promise.then(m => m.unmount());


```

- 使用BrowserRouter时本地需要配置

```js
{
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
}

```

[BrowserRouter使用](https://blog.csdn.net/wuyujin1997/article/details/111937956)

- types.d.ts 使用在项目中需要定义图片、less、等自定义模块，否则typescript会找不到类型

在tsconfig.json 中如下配置

```js
 // 声明文件所在目录 对应 src/types/types.d.ts d.ts是固定后缀
        "typeRoots": [
            "./src/types",
            "./node_modules/@types"
        ],
```

- redux 的使用 `yarn add redux react-redux redux-thunk`
- 创建store provider

```js
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

```js
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

```js
// src/mock/index.ts 在入口处引用此
import Mock from 'mockjs';
// 引入此文件即开启mock 拦截请求
Mock.mock('/api/getformData', {
  'list|1-10': [
    {
      'string|1-19': 'aa',
      'number|1-100': 30
    }
  ]
});
```

[mockjs使用](https://blog.csdn.net/TKY666/article/details/126215513)

- 安装react 所需依赖 `yarn add react react-dom reacr-router-dom @types/react @types/react-dom @types/react-router-dom typescript ts-loader`
- react-dom 支持jsx
- react-router-dom 支持路由
- typescript 提供语法支持
- ts-loader 处理.ts、.tsx 文件
- tsconfig.json ts配置项
  [tsconfig配置]（https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#基础）

### 微前端实现方案 在主应用中，通过使用微前端框架（如single-spa、qiankun等）来加载和管理子应用。

[微前端实现方案参考](https://www.jianshu.com/p/0ac8e1a666cf)
[single-spa](https://zh-hans.single-spa.js.org/docs/getting-started-overview/)
[qiankun](https://qiankun.umijs.org/zh/guide)

### 文档参考

[react-route-dom](https://reactrouter.com/en/dev/upgrading/v5)
[webpack](https://webpack.docschina.org/configuration/devtool/#root)
[ts入门](http://ts.xcatliu.com/)
[typescript](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#基础)
[antd v5x](https://ant-design.antgroup.com/components/overview-cn/)
