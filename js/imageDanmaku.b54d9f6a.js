(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["imageDanmaku"],{1148:function(t,e,r){"use strict";var n=r("da84"),o=r("5926"),i=r("577e"),a=r("1d80"),c=n.RangeError;t.exports=function(t){var e=i(a(this)),r="",n=o(t);if(n<0||n==1/0)throw c("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(e+=e))1&n&&(r+=e);return r}},"159b":function(t,e,r){var n=r("da84"),o=r("fdbc"),i=r("785a"),a=r("17c2"),c=r("9112"),u=function(t){if(t&&t.forEach!==a)try{c(t,"forEach",a)}catch(e){t.forEach=a}};for(var f in o)o[f]&&u(n[f]&&n[f].prototype);u(i)},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,o=r("a640"),i=o("forEach");t.exports=i?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(f){return void r(f)}c.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}},"1dde":function(t,e,r){var n=r("d039"),o=r("b622"),i=r("2d00"),a=o("species");t.exports=function(t){return i>=51||!n((function(){var e=[],r=e.constructor={};return r[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"32c9":function(t,e,r){},"3ea3":function(t,e,r){var n=r("23e7"),o=r("f748"),i=Math.abs,a=Math.pow;n({target:"Math",stat:!0},{cbrt:function(t){return o(t=+t)*a(i(t),1/3)}})},"400e":function(t,e,r){t.exports=r.p+"img/图层 10.25a7fab7.png"},"408a":function(t,e,r){var n=r("e330");t.exports=n(1..valueOf)},"48b9":function(t,e,r){},"4de4":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").filter,i=r("1dde"),a=i("filter");n({target:"Array",proto:!0,forced:!a},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"53ac":function(t,e,r){var n={"./euler.jpeg":"9412","./schrodinger.png":"8a5c","./图层 1.png":"bba4","./图层 10.png":"400e","./图层 2.png":"757b","./图层 3.png":"ed0c","./图层 4.png":"ed51","./图层 5.png":"9c0d","./图层 6.png":"d55b","./图层 7.png":"a623","./图层 9.png":"71b4"};function o(t){var e=i(t);return r(e)}function i(t){if(!r.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}o.keys=function(){return Object.keys(n)},o.resolve=i,t.exports=o,o.id="53ac"},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("b64b"),r("a4d3"),r("4de4"),r("d3b7"),r("e439"),r("159b"),r("dbb4");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"71b4":function(t,e){t.exports="data:image/png;base64,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"},"757b":function(t,e,r){t.exports=r.p+"img/图层 2.ceafcb53.png"},"7a01":function(t,e,r){"use strict";r("32c9")},"7bc5":function(t,e,r){"use strict";r("eed5")},"8a5c":function(t,e,r){t.exports=r.p+"img/schrodinger.7bf6af9f.png"},9412:function(t,e,r){t.exports=r.p+"img/euler.faae6b6a.jpeg"},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(S){u=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),a=new A(n||[]);return i._invoke=P(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=f;var l="suspendedStart",d="suspendedYield",p="executing",h="completed",v={};function b(){}function y(){}function g(){}var m={};u(m,i,(function(){return this}));var O=Object.getPrototypeOf,w=O&&O(O(M([])));w&&w!==r&&n.call(w,i)&&(m=w);var j=g.prototype=b.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"===typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function P(t,e,r){var n=l;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw i;return k()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=s(t,e,r);if("normal"===u.type){if(n=r.done?h:d,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=h,r.method="throw",r.arg=u.arg)}}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=s(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function M(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:k}}function k(){return{value:e,done:!0}}return y.prototype=g,u(j,"constructor",g),u(g,"constructor",y),y.displayName=u(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,c,"GeneratorFunction")),t.prototype=Object.create(j),t},t.awrap=function(t){return{__await:t}},x(E.prototype),u(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(j),u(j,c,"Generator"),u(j,i,(function(){return this})),u(j,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=M,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(R),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),f=n.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),R(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;R(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:M(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},"99af":function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("d039"),a=r("e8b5"),c=r("861d"),u=r("7b0b"),f=r("07fa"),s=r("8418"),l=r("65f0"),d=r("1dde"),p=r("b622"),h=r("2d00"),v=p("isConcatSpreadable"),b=9007199254740991,y="Maximum allowed index exceeded",g=o.TypeError,m=h>=51||!i((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),O=d("concat"),w=function(t){if(!c(t))return!1;var e=t[v];return void 0!==e?!!e:a(t)},j=!m||!O;n({target:"Array",proto:!0,forced:j},{concat:function(t){var e,r,n,o,i,a=u(this),c=l(a,0),d=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?a:arguments[e],w(i)){if(o=f(i),d+o>b)throw g(y);for(r=0;r<o;r++,d++)r in i&&s(c,d,i[r])}else{if(d>=b)throw g(y);s(c,d++,i)}return c.length=d,c}})},"9c0d":function(t,e,r){t.exports=r.p+"img/图层 5.8a91d6fd.png"},a623:function(t,e,r){t.exports=r.p+"img/图层 7.43ba5aa7.png"},b64b:function(t,e,r){var n=r("23e7"),o=r("7b0b"),i=r("df75"),a=r("d039"),c=a((function(){i(1)}));n({target:"Object",stat:!0,forced:c},{keys:function(t){return i(o(t))}})},b680:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("e330"),a=r("5926"),c=r("408a"),u=r("1148"),f=r("d039"),s=o.RangeError,l=o.String,d=Math.floor,p=i(u),h=i("".slice),v=i(1..toFixed),b=function(t,e,r){return 0===e?r:e%2===1?b(t,e-1,r*t):b(t*t,e/2,r)},y=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},g=function(t,e,r){var n=-1,o=r;while(++n<6)o+=e*t[n],t[n]=o%1e7,o=d(o/1e7)},m=function(t,e){var r=6,n=0;while(--r>=0)n+=t[r],t[r]=d(n/e),n=n%e*1e7},O=function(t){var e=6,r="";while(--e>=0)if(""!==r||0===e||0!==t[e]){var n=l(t[e]);r=""===r?n:r+p("0",7-n.length)+n}return r},w=f((function(){return"0.000"!==v(8e-5,3)||"1"!==v(.9,0)||"1.25"!==v(1.255,2)||"1000000000000000128"!==v(0xde0b6b3a7640080,0)}))||!f((function(){v({})}));n({target:"Number",proto:!0,forced:w},{toFixed:function(t){var e,r,n,o,i=c(this),u=a(t),f=[0,0,0,0,0,0],d="",v="0";if(u<0||u>20)throw s("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return l(i);if(i<0&&(d="-",i=-i),i>1e-21)if(e=y(i*b(2,69,1))-69,r=e<0?i*b(2,-e,1):i/b(2,e,1),r*=4503599627370496,e=52-e,e>0){g(f,0,r),n=u;while(n>=7)g(f,1e7,0),n-=7;g(f,b(10,n,1),0),n=e-1;while(n>=23)m(f,1<<23),n-=23;m(f,1<<n),g(f,1,1),m(f,2),v=O(f)}else g(f,0,r),g(f,1<<-e,0),v=O(f)+p("0",u);return u>0?(o=v.length,v=d+(o<=u?"0."+p("0",u-o)+v:h(v,0,o-u)+"."+h(v,o-u))):v=d+v,v}})},bba4:function(t,e,r){t.exports=r.p+"img/图层 1.382aa942.png"},d55b:function(t,e,r){t.exports=r.p+"img/图层 6.ad674725.png"},d81d:function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").map,i=r("1dde"),a=i("map");n({target:"Array",proto:!0,forced:!a},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},dbb4:function(t,e,r){var n=r("23e7"),o=r("83ab"),i=r("56ef"),a=r("fc6a"),c=r("06cf"),u=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,r,n=a(t),o=c.f,f=i(n),s={},l=0;while(f.length>l)r=o(n,e=f[l++]),void 0!==r&&u(s,e,r);return s}})},e439:function(t,e,r){var n=r("23e7"),o=r("d039"),i=r("fc6a"),a=r("06cf").f,c=r("83ab"),u=o((function(){a(1)})),f=!c||u;n({target:"Object",stat:!0,forced:f,sham:!c},{getOwnPropertyDescriptor:function(t,e){return a(i(t),e)}})},ecf9:function(t,e,r){"use strict";r.r(e);var n=r("7a23"),o=function(t){return Object(n["pushScopeId"])("data-v-3f591710"),t=t(),Object(n["popScopeId"])(),t},i={class:"view"},a=o((function(){return Object(n["createElementVNode"])("div",{class:"bubble"},null,-1)}));function c(t,e,r,o,c,u){var f=Object(n["resolveComponent"])("BubbleCSS");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",i,[Object(n["createVNode"])(f,{enums:t.bubbles},{default:Object(n["withCtx"])((function(t){return[a]})),_:1},8,["enums"])])}var u=r("1da1"),f=(r("96cf"),r("d3b7"),r("ddb0"),r("3ca3"),r("d81d"),r("a630"),r("99af"),r("b680"),{class:"img-danmaku"});function s(t,e,r,o,i,a){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",f,[Object(n["createElementVNode"])("div",{class:"inner-containers",ref:"container",onMousemove:e[0]||(e[0]=function(){return t.onMouseMove&&t.onMouseMove.apply(t,arguments)})},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(t.enums,(function(e,r){var o,i,a;return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{class:"bubble-container",key:r,style:Object(n["normalizeStyle"])({transform:"translate3D(".concat(null===(o=t.positions[r])||void 0===o?void 0:o.value.x.toFixed(),"px, ").concat(null===(i=t.positions[r])||void 0===i?void 0:i.value.y.toFixed(),"px, ").concat(null===(a=t.positions[r])||void 0===a?void 0:a.value.z.toFixed(),"px)")})},[Object(n["renderSlot"])(t.$slots,"default",{item:e,index:r,position:t.positions[r]},void 0,!0)],4)})),128))],544)])}var l,d=function(){var t=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:293,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:5,y:5,z:5};return{x:Math.random()*t*e.x/273,y:Math.random()*t*e.y/273,z:Math.random()*t*e.z/273}};return{getOffsets:t}},p=(r("3ea3"),r("5530")),h=(r("b64b"),r("159b"),function(t){return Math.sqrt(Object.keys(t).reduce((function(e,r){return e+Math.pow(t[r],2)}),0))}),v=function(t,e){var r=Object(p["a"])({},t);return Object.keys(r).forEach((function(t){return r[t]=r[t]*e})),r},b=function(t,e){var r=Object(p["a"])({},t);return Object.keys(r).forEach((function(t){return r[t]+=e[t]})),r},y=function(t,e){var r=Object(p["a"])({},t);return Object.keys(r).forEach((function(t){return r[t]-=e[t]})),r};(function(t){t[t["PAUSE"]=0]="PAUSE",t[t["RUN"]=1]="RUN",t[t["STOP"]=2]="STOP"})(l||(l={}));var g=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=function(){return{x:0,y:0,z:0}},n=Array.from({length:t},(function(){return{position:r(),velocity:r(),acceleration:r()}})),o=function(t){if(n[t].position=b(n[t].position,v(n[t].velocity,1/60)),n[t].velocity=b(n[t].velocity,v(n[t].acceleration,1/60)),e){var r=h(n[t].velocity),o=e*Math.pow(r,2);n[t].velocity=o/60>r?{x:0,y:0,z:0}:y(n[t].velocity,v(n[t].velocity,Math.cbrt(o)/60))}},i={renderState:l.STOP,beforeRender:function(){},renderLoop:function(){},afterRender:function(){},onSimulate:o},a=function e(){if(i.renderState!==l.STOP){if(i.renderState===l.RUN){for(var r=0;r<t;r++)i.onSimulate(r);i.renderLoop()}requestAnimationFrame(e)}else for(var n=0;n<t;n++)i.afterRender(n)},c=function(){var e=i.renderState;switch(i.renderState=l.RUN,e){case l.STOP:for(var r=0;r<t;r++)i.beforeRender(r);requestAnimationFrame(a);break;case l.PAUSE:i.renderState=l.RUN;break;default:break}},u=function(){i.renderState=l.STOP},f=function(){i.renderState=l.PAUSE};return{states:n,callChain:i,renderStart:c,renderPause:f,renderStop:u}},m=g,O=Object(n["defineComponent"])({props:{enums:{type:Array,required:!0}},setup:function(t){var e=Object(n["toRefs"])(t),r=e.enums,o=Object(n["ref"])(null),i=Object(n["computed"])((function(){return o.value?{x:o.value.offsetWidth,y:o.value.offsetHeight}:{x:0,y:0}})),a=Object(n["reactive"])(Array.from({length:r.value.length},(function(){return Object(n["ref"])({x:0,y:0,z:0})}))),c=Object(n["computed"])((function(){return r.value.length})),u=Object(n["ref"])(0),f=Object(n["ref"])(0),s=Object(n["ref"])(0),l=m(c.value,.001),p=l.states,h=l.callChain,v=l.renderStart,b=(l.renderPause,l.renderStop,d()),y=(b.getOffsets,function(){var t=Math.random()*i.value.y+i.value.y;return{x:Math.random()*i.value.x*3-i.value.x,y:t,z:100*Math.random()-50}});h.beforeRender=function(t){p[t].position=y(),p[t].acceleration={x:2*Math.random()-1,y:50*-Math.random()-80,z:2*Math.random()-1}},h.renderLoop=function(){for(var t=0;t<r.value.length;t++){var e=y();p[t].position.y<0&&(p[t].position=e),a[t].value=p[t].position,p[t].velocity.x+=8*f.value}s.value+=f.value,f.value=0,u.value++},Object(n["onMounted"])((function(){v()}));var g=function(t){f.value=t.movementX};return{container:o,componentWH:i,positions:a,onMouseMove:g,dX:f,xOffset:s}}}),w=(r("7bc5"),r("6b0d")),j=r.n(w);const x=j()(O,[["render",s],["__scopeId","data-v-63df39f3"]]);var E=x,P=Object(n["defineComponent"])({components:{BubbleCSS:E},setup:function(){Object(n["ref"])(0),Object(n["ref"])([]);var t=Object(n["ref"])([]);return t.value=Array.from({length:100},(function(t,e){return e})),Object(n["onMounted"])(Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))),{bubbles:t}}});r("f9fe"),r("7a01");const L=j()(P,[["render",c],["__scopeId","data-v-3f591710"]]);e["default"]=L},ed0c:function(t,e,r){t.exports=r.p+"img/图层 3.9271b0be.png"},ed51:function(t,e,r){t.exports=r.p+"img/图层 4.a7b203b1.png"},eed5:function(t,e,r){},f748:function(t,e){t.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},f9fe:function(t,e,r){"use strict";r("48b9")}}]);
//# sourceMappingURL=imageDanmaku.b54d9f6a.js.map