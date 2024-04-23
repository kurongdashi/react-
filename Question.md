## 高级Web前端面试题可以包括以下问题：(来自AI提问)

```
浏览器中的线程
GUI 线程复责渲染 和JS引擎线程互斥
JS引擎线程 负责执行JS
时间触发线程 setTimeout
异步请求线程 XmlHttpRequest
```

```
常见网络攻击
xss 脚本注入攻击（输入框输入恶意脚本进行攻击），输入校验+不使用eval()
csrf:(corss-site-request-forgery) 冒充用户（获取用户登录）发送请求攻击，加密字符串做token等校验
ddos: 发送无效请攻击服务器，使之不能响应，应该设置防火墙或负载均衡器
sql注入：输入框输入恶意SQL攻击数据库，用户登录过滤，预编译等

```

```
常见http code
200:成功
201：创建请求
304：资源未修改
400：入参错误
401：token失效
403：CORS 跨域问题
415：请求数据格式问题 json/formdata ...
404：找不到
500：服务器错误
503：服务不可用

```

```

DOM（文档对象模型）和BOM（浏览器对象模型）是JavaScript中两个重要的概念。

DOM（Document Object Model）是一种编程接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。在DOM中，HTML或XML文档被转化为由对象构成的树结构，这些对象包括元素、属性、文本节点等等。JavaScript可以通过操作DOM来动态地修改网页的内容、结构和样式，从而实现网页的动态交互效果。

BOM（Browser Object Model）也提供了一些对象，它们代表了浏览器窗口和与浏览器窗口交互的元素。BOM的主要对象包括window、document、location、navigator、screen和history等。其中，window对象是最重要的对象之一，它代表了浏览器窗口，并提供了许多方法和属性，例如alert()方法、sessionStorage和localStorage等。BOM允许JavaScript与浏览器窗口进行交互，例如关闭窗口、打开新窗口、获取浏览器历史记录等。

总的来说，DOM和BOM都是JavaScript中非常重要的概念，它们使得JavaScript可以与网页内容和浏览器进行交互，从而实现网页的动态效果和交互功能。
```

```
标准盒子模型：宽度不包括 padding,border
IE盒子模型：宽度包含padding，border
```

```
webpack 流程
1、从配置文件和shell命令中读取参数
2、开始编译初始化compiler 对象后初始化plugin
3、找出entry入口
4、根据loader 及其依赖开始编译
5、完成编译得到所有依赖关系图
6、输出依赖关系文件
```

```
tree-shaking 两种开启方式
在生产环境下默认是开启的
1、optimization.useExports：true,表示按照导入导出的规则删除未使用的代码，依赖于terser插件执行js检查任务
会检查每一个依赖

2、在optimization.sideEffects=true，表示使用模块/文件会跳过terser检查，直接删除未使用的代码

使用注释 /*#__PURE__*/ funtion add(){}，表示这个函数如果没有被使用，则可以安全删除
package.json 里配置哪些文件有副作用（副作用就是没有被导出使用，但任然有用中间代码，就是不能删除的代码）
{
    "name":'myproject',
    "sideEffects":['./src/start.ts','*.css','*.less'],//这里面的模块有副作用(非有必要不要使用)
    "sideEffects":false,//整个项目都没有副作用
}
注意：
必须使用esm 导入导出
不能被 @babel/preset-env 编译为commonjs否则无法生效

```

```
js 垃圾回收机制：标记清除，和引用计数（少用）
过程：从根对象开始遍历所有可访问的对象，将其标记为活动，未被标记的则为垃圾对象，标记完成后会清空堆内存，释放内存，
同时还会整理内存空间，将活动对象移动到一起，减少内存碎片
注意：减少使用全局对象，及时解除非不要的对象引用，避免循环引用（闭包），使用对象管理池来重复使用像线程池

```

```
sevlet 工作原理
当客户端发送请求后，通过service()方法进行响应，然后选择使用doGet或doPost处理，Sevlet接口被genericSevlet抽象类实现
包括init,sevice，destory三个声明周期方法，httpSevlet对象又继承了genericSevlet所以自定义sevlet 只需继承httpSelvt然后
复写sevice()或doGet，doPost方法即可

```

[webpack 的 runtimeChunk](https://blog.csdn.net/fy_java1995/article/details/110119934)
[webpack 的 tree-shaking](https://www.zhihu.com/question/568855947/answer/3274565524)
[前端面试题2](https://zhuanlan.zhihu.com/p/609698817)
[前端面试题3](https://zhuanlan.zhihu.com/p/563612885)
[http code](https://zhuanlan.zhihu.com/p/416646367)
[yarn 命令](https://www.jianshu.com/p/53b517f58d75)
