// 自定义模块声明,否则 less及导入的图片，字体等typescript 将无法找到对应的类型
declare module "*.less" {
    const classes {  [ key: string ]: any};
    export default classes;
}
// 定义图片
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
declare module "*.gif";