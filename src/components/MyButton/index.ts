export default class MyButton extends HTMLElement {
    button: any;
    _shadowRoot: ShadowRoot;
    constructor() {
        super();
        this._text = null;
        // 可以添加一个模版
        const button = document.createElement('button');
        this._shadowRoot = this.attachShadow({ mode: 'closed' });
        this._shadowRoot.appendChild(button);
        console.log('_shadowRoot', this._shadowRoot);
        this.button = this._shadowRoot.querySelector('button');
        console.log('this.button=', this.button);
        // 事件触发
        this.button.addEventListener('click', () => {
            console.log('click event=');
            this.dispatchEvent(
                new CustomEvent('onCustomClick', {
                    detail: '史学家'
                })
            );
        });
    }
    connectedCallback() {
        // 元素插入文档触发== onmounted()
        console.log('元素插入文档触发==');
        // mode：open 外部custome返回shadowRoot close则 外部custome返回null
    }
    // 属性变化后回调
    attributeChangedCallback(name, oldV, newV) {
        console.log('元素属性变化后回调==');
        this._text = newV;
        this.render();
    }
    // 要观察的属性值
    static observedAttributes = ['text'];
    get text() {
        return this._text;
    }
    set text(val) {
        this.setAttribute('text', val);
    }
    render() {
        this.button.innerText = this.text;
    }

    disConnectedCallback() {
        console.log('元素卸载触发==');
    }
}
// 定义原生组件
window.customElements.define('hello-world', MyButton);
