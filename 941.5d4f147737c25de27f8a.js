(self.webpackChunkc2c_demand_flex=self.webpackChunkc2c_demand_flex||[]).push([[941],{7941:z=>{var _=function(s){"use strict";var v,M=Object.prototype,p=M.hasOwnProperty,k="function"==typeof Symbol?Symbol:{},m=k.iterator||"@@iterator",B=k.asyncIterator||"@@asyncIterator",G=k.toStringTag||"@@toStringTag";function h(r,t,e){return Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}),r[t]}try{h({},"")}catch(r){h=function(t,e,o){return t[e]=o}}function R(r,t,e,o){var i=Object.create((t&&t.prototype instanceof T?t:T).prototype),a=new P(o||[]);return i._invoke=function(r,t,e){var o=Y;return function(i,a){if(o===q)throw new Error("Generator is already running");if(o===L){if("throw"===i)throw a;return $()}for(e.method=i,e.arg=a;;){var u=e.delegate;if(u){var c=W(u,e);if(c){if(c===l)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(o===Y)throw o=L,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);o=q;var f=O(r,t,e);if("normal"===f.type){if(o=e.done?L:H,f.arg===l)continue;return{value:f.arg,done:e.done}}"throw"===f.type&&(o=L,e.method="throw",e.arg=f.arg)}}}(r,e,a),i}function O(r,t,e){try{return{type:"normal",arg:r.call(t,e)}}catch(o){return{type:"throw",arg:o}}}s.wrap=R;var Y="suspendedStart",H="suspendedYield",q="executing",L="completed",l={};function T(){}function b(){}function d(){}var N={};h(N,m,function(){return this});var j=Object.getPrototypeOf,S=j&&j(j(A([])));S&&S!==M&&p.call(S,m)&&(N=S);var g=d.prototype=T.prototype=Object.create(N);function D(r){["next","throw","return"].forEach(function(t){h(r,t,function(e){return this._invoke(t,e)})})}function E(r,t){function e(i,a,u,c){var f=O(r[i],r,a);if("throw"!==f.type){var C=f.arg,w=C.value;return w&&"object"==typeof w&&p.call(w,"__await")?t.resolve(w.__await).then(function(y){e("next",y,u,c)},function(y){e("throw",y,u,c)}):t.resolve(w).then(function(y){C.value=y,u(C)},function(y){return e("throw",y,u,c)})}c(f.arg)}var o;this._invoke=function(i,a){function u(){return new t(function(c,f){e(i,a,c,f)})}return o=o?o.then(u,u):u()}}function W(r,t){var e=r.iterator[t.method];if(e===v){if(t.delegate=null,"throw"===t.method){if(r.iterator.return&&(t.method="return",t.arg=v,W(r,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var o=O(e,r.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,l;var n=o.arg;return n?n.done?(t[r.resultName]=n.value,t.next=r.nextLoc,"return"!==t.method&&(t.method="next",t.arg=v),t.delegate=null,l):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function K(r){var t={tryLoc:r[0]};1 in r&&(t.catchLoc=r[1]),2 in r&&(t.finallyLoc=r[2],t.afterLoc=r[3]),this.tryEntries.push(t)}function I(r){var t=r.completion||{};t.type="normal",delete t.arg,r.completion=t}function P(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(K,this),this.reset(!0)}function A(r){if(r){var t=r[m];if(t)return t.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var e=-1,o=function n(){for(;++e<r.length;)if(p.call(r,e))return n.value=r[e],n.done=!1,n;return n.value=v,n.done=!0,n};return o.next=o}}return{next:$}}function $(){return{value:v,done:!0}}return b.prototype=d,h(g,"constructor",d),h(d,"constructor",b),b.displayName=h(d,G,"GeneratorFunction"),s.isGeneratorFunction=function(r){var t="function"==typeof r&&r.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},s.mark=function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,d):(r.__proto__=d,h(r,G,"GeneratorFunction")),r.prototype=Object.create(g),r},s.awrap=function(r){return{__await:r}},D(E.prototype),h(E.prototype,B,function(){return this}),s.AsyncIterator=E,s.async=function(r,t,e,o,n){void 0===n&&(n=Promise);var i=new E(R(r,t,e,o),n);return s.isGeneratorFunction(t)?i:i.next().then(function(a){return a.done?a.value:i.next()})},D(g),h(g,G,"Generator"),h(g,m,function(){return this}),h(g,"toString",function(){return"[object Generator]"}),s.keys=function(r){var t=[];for(var e in r)t.push(e);return t.reverse(),function o(){for(;t.length;){var n=t.pop();if(n in r)return o.value=n,o.done=!1,o}return o.done=!0,o}},s.values=A,P.prototype={constructor:P,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.method="next",this.arg=v,this.tryEntries.forEach(I),!r)for(var t in this)"t"===t.charAt(0)&&p.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=v)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var t=this;function e(c,f){return i.type="throw",i.arg=r,t.next=c,f&&(t.method="next",t.arg=v),!!f}for(var o=this.tryEntries.length-1;o>=0;--o){var n=this.tryEntries[o],i=n.completion;if("root"===n.tryLoc)return e("end");if(n.tryLoc<=this.prev){var a=p.call(n,"catchLoc"),u=p.call(n,"finallyLoc");if(a&&u){if(this.prev<n.catchLoc)return e(n.catchLoc,!0);if(this.prev<n.finallyLoc)return e(n.finallyLoc)}else if(a){if(this.prev<n.catchLoc)return e(n.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<n.finallyLoc)return e(n.finallyLoc)}}}},abrupt:function(r,t){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&p.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}}n&&("break"===r||"continue"===r)&&n.tryLoc<=t&&t<=n.finallyLoc&&(n=null);var i=n?n.completion:{};return i.type=r,i.arg=t,n?(this.method="next",this.next=n.finallyLoc,l):this.complete(i)},complete:function(r,t){if("throw"===r.type)throw r.arg;return"break"===r.type||"continue"===r.type?this.next=r.arg:"return"===r.type?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):"normal"===r.type&&t&&(this.next=t),l},finish:function(r){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.finallyLoc===r)return this.complete(e.completion,e.afterLoc),I(e),l}},catch:function(r){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.tryLoc===r){var o=e.completion;if("throw"===o.type){var n=o.arg;I(e)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(r,t,e){return this.delegate={iterator:A(r),resultName:t,nextLoc:e},"next"===this.method&&(this.arg=v),l}},s}(z.exports);try{regeneratorRuntime=_}catch(s){"object"==typeof globalThis?globalThis.regeneratorRuntime=_:Function("r","regeneratorRuntime = r")(_)}}}]);