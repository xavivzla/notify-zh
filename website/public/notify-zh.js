"use strict";var C=Object.defineProperty,J=Object.defineProperties,K=Object.getOwnPropertyDescriptor,Q=Object.getOwnPropertyDescriptors,V=Object.getOwnPropertyNames,F=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var k=s=>{throw TypeError(s)};var H=(s,t,e)=>t in s?C(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,m=(s,t)=>{for(var e in t||(t={}))D.call(t,e)&&H(s,e,t[e]);if(F)for(var e of F(t))Z.call(t,e)&&H(s,e,t[e]);return s},y=(s,t)=>J(s,Q(t));var tt=(s,t)=>{for(var e in t)C(s,e,{get:t[e],enumerable:!0})},et=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of V(t))!D.call(s,n)&&n!==e&&C(s,n,{get:()=>t[n],enumerable:!(i=K(t,n))||i.enumerable});return s};var st=s=>et(C({},"__esModule",{value:!0}),s);var E=(s,t,e)=>t.has(s)||k("Cannot "+e);var a=(s,t,e)=>(E(s,t,"read from private field"),e?e.call(s):t.get(s)),f=(s,t,e)=>t.has(s)?k("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),N=(s,t,e,i)=>(E(s,t,"write to private field"),i?i.call(s,e):t.set(s,e),e),l=(s,t,e)=>(E(s,t,"access private method"),e);var B=(s,t,e,i)=>({set _(n){N(s,t,n,e)},get _(){return a(s,t,i)}});var at={};tt(at,{default:()=>ot});module.exports=st(at);var nt="notifyContainer",R="divNotification",U="notifyCustom",P="animateInOpacity",X="animateOutOpacity",x,b,g,I,r,o,$,q,W,Y,G,j,h,T=class{constructor(){f(this,o);f(this,x,null);f(this,b,null);f(this,g,!1);f(this,I,1);f(this,r,{defaultTime:3e3,position:"center-top",disableDefaultStyles:!1,classNames:{},backgrounds:{warning:"#F09200",error:"#DE350B",success:"#13BF5F",info:"#4261fb"}});this.arr=[]}config(t){var i;let e=a(this,r).position;if(N(this,r,y(m(m({},a(this,r)),t),{classNames:m(m({},a(this,r).classNames),(i=t.classNames)!=null?i:{})})),t.position&&t.position!==e&&a(this,x)){let n=l(this,o,$).call(this,t.position);a(this,x).style.cssText=n,a(this,b)&&(a(this,b).style.flexDirection=t.position.includes("bottom")?"column":"column-reverse")}}success(t){l(this,o,h).call(this,y(m({},t),{type:"success"}))}warning(t){l(this,o,h).call(this,y(m({},t),{type:"warning"}))}error(t){l(this,o,h).call(this,y(m({},t),{type:"error"}))}info(t){l(this,o,h).call(this,y(m({},t),{type:"info"}))}};x=new WeakMap,b=new WeakMap,g=new WeakMap,I=new WeakMap,r=new WeakMap,o=new WeakSet,$=function(t){let e="position: fixed; z-index: 2000; pointer-events: none;";switch(t){case"top-left":return`${e} top: 20px; left: 20px;`;case"top-right":return`${e} top: 20px; right: 20px;`;case"bottom-left":return`${e} bottom: 20px; left: 20px;`;case"bottom-right":return`${e} bottom: 20px; right: 20px;`;case"center-bottom":return`${e} bottom: 20px; left: 50%; transform: translateX(-50%);`;case"center-top":return`${e} top: 20px; left: 50%; transform: translateX(-50%);`;case"center":return`${e} top: 50%; left: 50%; transform: translate(-50%, -50%);`;default:return`${e} top: 20px; left: 50%; transform: translateX(-50%);`}},q=function(){if(document.getElementById("notify-zh-styles"))return;let t=document.createElement("style");t.id="notify-zh-styles",t.textContent=`
      .${U} {
        z-index: 9999;
        border-radius: 3px;
        box-sizing: border-box;
        color: #fff;
        font-size: 1rem;
        background: #000;
        text-align: center;
        padding: 12px 40px;
        opacity: 0;
        display: inline;
        margin-bottom: 10px;
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
        border-radius: 5px;
      }
      .${P} {
        animation: showOpacity 1s;
      }
      .${X} {
        animation: hideOpacity 1s;
      }
      @keyframes showOpacity {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes hideOpacity {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `,document.head.appendChild(t)},W=function(t){let e=`${nt}-${t}`,i=document.getElementById(e);if(!i){i=document.createElement("div"),i.id=e;let n=l(this,o,$).call(this,t);i.style.cssText=n;let c=document.createElement("div");c.id=`${R}-${t}`,c.style.display="flex",c.style.flexDirection=t.includes("bottom")?"column":"column-reverse",c.style.alignItems="center",i.appendChild(c),document.body.appendChild(i)}return i},Y=function(t){var L,v,w,A,M,_;let{type:e,message:i,icon:n}=t,c=B(this,I)._++,u=(v=(L=a(this,r).backgrounds)==null?void 0:L[e])!=null?v:"#000",d=(A=(w=a(this,r).classNames)==null?void 0:w.base)!=null?A:U,O=(_=(M=a(this,r).classNames)==null?void 0:M[e])!=null?_:`notify-${e}`,p=document.createElement("div");p.className=`${d} ${O}`,p.id=`notify-${c}`;let S=document.createElement("span");if(S.textContent=i,n!=null&&n.el){let z=document.createElement("span");z.innerHTML=n==null?void 0:n.el,p.appendChild(z)}return p.appendChild(S),p.style.display="flex",p.style.alignItems="center",p.style.background=u,p},G=function(t){var n,c,u,d;let e=(c=(n=a(this,r).classNames)==null?void 0:n.animateOut)!=null?c:X,i=(d=(u=a(this,r).classNames)==null?void 0:u.animateIn)!=null?d:P;t.addEventListener("animationend",()=>{t.remove()},{once:!0}),t.classList.remove(i),t.classList.add(e)},j=function(t){var i,n;let e=(n=(i=a(this,r).classNames)==null?void 0:i.animateIn)!=null?n:P;t.style.opacity="0",requestAnimationFrame(()=>{t.addEventListener("animationend",()=>{},{once:!0}),t.classList.add(e),t.style.opacity="1"})},h=function(t){var d,O,p;!a(this,g)&&!a(this,r).disableDefaultStyles&&(l(this,o,q).call(this),N(this,g,!0));let e=(O=(d=t.position)!=null?d:a(this,r).position)!=null?O:"center-top",n=l(this,o,W).call(this,e).querySelector(`#${R}-${e}`);if(!n){console.error("Notify zh: Notification wrapper not available.");return}let c=l(this,o,Y).call(this,t),u=(p=t.time)!=null?p:a(this,r).defaultTime;n.appendChild(c),l(this,o,j).call(this,c),setTimeout(()=>{l(this,o,G).call(this,c)},u)};var it=new T,ot=it;
//# sourceMappingURL=index.js.map