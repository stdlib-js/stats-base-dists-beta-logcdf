"use strict";var c=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var a=c(function(k,f){
var v=require('@stdlib/math-base-special-betainc/dist'),u=require('@stdlib/math-base-assert-is-nan/dist'),N=require('@stdlib/math-base-special-ln/dist'),y=require('@stdlib/constants-float64-ninf/dist');function d(e,r,i){return u(e)||u(r)||u(i)||r<=0||i<=0?NaN:e<=0?y:e>=1?0:N(v(e,r,i))}f.exports=d
});var s=c(function(w,o){
var F=require('@stdlib/utils-constant-function/dist'),g=require('@stdlib/math-base-special-betainc/dist'),t=require('@stdlib/math-base-assert-is-nan/dist'),I=require('@stdlib/math-base-special-ln/dist'),l=require('@stdlib/constants-float64-ninf/dist');function m(e,r){if(t(e)||t(r)||e<=0||r<=0)return F(NaN);return i;function i(n){return t(n)?NaN:n<=0?l:n>=1?0:I(g(n,e,r))}}o.exports=m
});var O=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),q=a(),R=s();O(q,"factory",R);module.exports=q;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
