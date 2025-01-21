// Copyright (c) 2025 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@v0.2.1-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-betainc@v0.2.2-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-nan@v0.2.2-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-ln@v0.2.4-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-ninf@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-constant-function@v0.2.2-esm/index.mjs";function m(t,r,m){return n(t)||n(r)||n(m)||r<=0||m<=0?NaN:t<=0?i:t>=1?0:e(s(t,r,m))}function d(t,m){return n(t)||n(m)||t<=0||m<=0?r(NaN):function(r){if(n(r))return NaN;if(r<=0)return i;if(r>=1)return 0;return e(s(r,t,m))}}t(m,"factory",d);export{m as default,d as factory};
//# sourceMappingURL=index.mjs.map
