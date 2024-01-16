import * as r from "lodash";
var e = {
    d: (r, o) => {
      for (var t in o)
        e.o(o, t) &&
          !e.o(r, t) &&
          Object.defineProperty(r, t, { enumerable: !0, get: o[t] });
    },
    o: (r, e) => Object.prototype.hasOwnProperty.call(r, e),
  },
  o = {};
e.d(o, { IH: () => d, v_: () => u, S0: () => c });
const t = ((n = { default: () => r.default }), (a = {}), e.d(a, n), a);
var n, a;
function d(...r) {
  return r.reduce((r, e) => r + e);
}
function u(r, e) {
  return t.default.join([r, e]);
}
function c(r) {
  return console.log("输出一段文字：" + r), "输出一段文字：" + r;
}
var f = o.IH,
  i = o.v_,
  l = o.S0;
export { f as add, i as join, l as print };
