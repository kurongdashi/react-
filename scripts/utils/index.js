// 多页面应用打包
const fs = require('fs');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// 需要查找那个目录
const dirPath = path.resolve(__dirname, '../../src/views');
const entry = {};
// 读取路径下所有目录名称,打包时一个目录名称对应生成一个html
const getEntry = () => {
  fs.readdirSync(dirPath).filter((dirname) => {
    // 目录绝对路径
    const entryPath = path.join(dirPath, dirname, 'index.tsx');
    // 文件是否存在
    console.log('entryPath===', entryPath);
    const stat = fs.existsSync(entryPath);
    if (stat) {
      // 保存文件的绝对路径
      entry[dirname] = entryPath;
    }
  });
};
// 根据entry 生成多页面配置
const getHtmlPages = () => {
  const entry = getEntry();
  Object.keys(entry).forEach((dirname) => {
    const htmlPages = [];
    htmlPages.push(
      new htmlWebpackPlugin({
        filename: `${dirname}.html`,
        template: path.resolve(__dirname, '../../public/index.html'),
        chunks: [dirname]
      })
    );
  });
};

module.exports = {
  getHtmlPages,
  getEntry
};
