// sandbox 实现原理
/**
 * qiankunjs 实现原理
 *
 *生命周期->路由加载->sandbox隔离->shadow dom隔离
 *
 * shadow dom隔离 动态从子应用中取出template.innerHTML 赋值给一个新<div>.innerHTML,然后将这个div挂载到主document上
 *
 */
class Sandbox {
    box = null;
    isRunning = false;
    fakeWind = {};
    realWind = window;
    jsStr = `console.log(name)`;
    // 使用立即执行函数将
    codeA = `(function(window){
    // let windA=${JSON.stringify(fakeWind)};
    ${jsStr}
    })(fakeWind)`;

    eval(codeA);
    // 子应运行时 window 代理，防止修改
    box = new Proxy(fakeWind, {
        get(target, key, val) {
            if (Reflect.has(target, key)) {
                return Reflect.get(target, key);
            } else {
                // 从真实window取
                return Reflect.get(realWind, key);
            }
        },
        set(target, key, val) {
            Reflect.set(target, key, val);
        }
    });
    active() {
        this.isRunning = true;
    }
    inactive() {
        this.isRunning = false;
        this.fakeWind = {};
    }
}
