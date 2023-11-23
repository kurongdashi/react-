# 1、项目搭建顺序
- 安装yarn `npm i yarn -g`
## 安装基础依赖 
- 安装打包工具 `yarn add webpack webpack-cli webpack-dev-server cross-env`
webpac 包含基础API
webpack-cli 可以提供命令行 再package.json 中使用 webpack --config 等命令
webpack-dev-server 可以启动一个热更新本地服务
cross-env 可以再运行webpack 时设置环境变量 cross-env NODE_ENV=pro

- 安装打包配置项所需依赖 `yarn add clean-webpack-plugin html-webpack-plugin`
html-webpack-plugin 自动生成html
clean-webpack-plugin 每次运行前清除dist

- 安装样式处理所需依赖 `yarn add less-loader less css-loader style-loader postcss-loader postcss-preset-env`
less 提供less语法
less-loader 处理less
css-loader 可以处理css
postcss-loader 可以自动给样式添加前缀
postcss-preset-env 搭配postcss-loader 使用
style-loader 可以将 css 以 <style> 标签形式插入html

- 安装图片处理所需依赖 `yarn add file-loader`
file-loader 可以压缩图片

- 安装react 所需依赖 `yarn add react react-dom reacr-router-dom @types/react @types/react-dom @types/react-router-dom typescript ts-loader`
react-dom 支持jsx
react-router-dom 支持路由
typescript 提供语法支持
ts-loader 处理.ts、.tsx 文件
tsconfig.json ts配置项


- 安装JS处理 所需依赖 `yarn add @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react`
@babel/preset-react react转js
@babel/preset-typescript ts转js
@babel/preset-env 搭配babel 使用 
.babelrc 文件配置项


