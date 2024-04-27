import { fetchResource } from './utils';

export const importHtml = async (url) => {
  // url=//localhost:80001
  const html = await fetchResource(url);
  const template = document.createElement('div');
  // const shadow = template.attachShadow({ mode: 'open' });
  // shadow.innerHTML = html;
  template.innerHTML = html;
  //   动态添加到div节点后，通过querySelectorAll获取script标签
  const scripts = template.querySelectorAll('script');
  console.log('scripts 标签=', scripts);
  /**
   *  获取所有script 里的内容，包括src='xxx.js'或者 <script>xxx</script>
   * @returns Promise.all
   */
  const getScriptsContent = () => {
    const promiseArr = Array.from(scripts).map((script) => {
      const src = script.getAttribute('src');
      if (!src) {
        // <script>xxx</script> 类型
        return Promise.resolve(script.innerHTML);
      } else {
        // src='http://xx.main.js' 或者src='/main.js'
        const path = src.startsWith('http') ? src : `${url}${src}`;
        return fetchResource(path);
      }
    });
    // 让所有的script 标签全部读取完成
    return Promise.all(promiseArr);
  };

  /**
   * 执行script 内容
   */
  const execScript = async () => {
    const scripts = await getScriptsContent();
    console.log('scripts 内容=', scripts);
    // 子应用打包umd 库文件，可手动构造module 接受整个库
    const module = { exports: {} };
    const exports = module.exports;
    // 执行所有的code
    scripts.forEach((code) => {
      eval(code);
    });
    // 这里就可以获取子应用暴露的钩子函数了
    console.log('module.exports', module.exports);
    return module.exports;
  };

  return {
    template,
    getScriptsContent,
    execScript
  };
};
