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

[webpack 的 tree-shaking](https://www.zhihu.com/question/568855947/answer/3274565524)
[前端面试题2](https://zhuanlan.zhihu.com/p/609698817)
[前端面试题3](https://zhuanlan.zhihu.com/p/563612885)
[http code](https://zhuanlan.zhihu.com/p/416646367)
[yarn 命令](https://www.jianshu.com/p/53b517f58d75)
