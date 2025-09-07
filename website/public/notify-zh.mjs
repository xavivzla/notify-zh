var G=Object.defineProperty,j=Object.defineProperties;var J=Object.getOwnPropertyDescriptors;var z=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var H=s=>{throw TypeError(s)};var F=(s,t,e)=>t in s?G(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,m=(s,t)=>{for(var e in t||(t={}))K.call(t,e)&&F(s,e,t[e]);if(z)for(var e of z(t))Q.call(t,e)&&F(s,e,t[e]);return s},y=(s,t)=>j(s,J(t));var I=(s,t,e)=>t.has(s)||H("Cannot "+e);var a=(s,t,e)=>(I(s,t,"read from private field"),e?e.call(s):t.get(s)),f=(s,t,e)=>t.has(s)?H("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),C=(s,t,e,n)=>(I(s,t,"write to private field"),n?n.call(s,e):t.set(s,e),e),l=(s,t,e)=>(I(s,t,"access private method"),e);var D=(s,t,e,n)=>({set _(i){C(s,t,i,e)},get _(){return a(s,t,n)}});var V="notifyContainer",k="divNotification",B="notifyCustom",E="animateInOpacity",R="animateOutOpacity",x,b,g,N,r,o,T,U,X,q,W,Y,h,P=class{constructor(){f(this,o);f(this,x,null);f(this,b,null);f(this,g,!1);f(this,N,1);f(this,r,{defaultTime:3e3,position:"center-top",disableDefaultStyles:!1,classNames:{},backgrounds:{warning:"#F09200",error:"#DE350B",success:"#13BF5F",info:"#4261fb"}});this.arr=[]}config(t){var n;let e=a(this,r).position;if(C(this,r,y(m(m({},a(this,r)),t),{classNames:m(m({},a(this,r).classNames),(n=t.classNames)!=null?n:{})})),t.position&&t.position!==e&&a(this,x)){let i=l(this,o,T).call(this,t.position);a(this,x).style.cssText=i,a(this,b)&&(a(this,b).style.flexDirection=t.position.includes("bottom")?"column":"column-reverse")}}success(t){l(this,o,h).call(this,y(m({},t),{type:"success"}))}warning(t){l(this,o,h).call(this,y(m({},t),{type:"warning"}))}error(t){l(this,o,h).call(this,y(m({},t),{type:"error"}))}info(t){l(this,o,h).call(this,y(m({},t),{type:"info"}))}};x=new WeakMap,b=new WeakMap,g=new WeakMap,N=new WeakMap,r=new WeakMap,o=new WeakSet,T=function(t){let e="position: fixed; z-index: 2000; pointer-events: none;";switch(t){case"top-left":return`${e} top: 20px; left: 20px;`;case"top-right":return`${e} top: 20px; right: 20px;`;case"bottom-left":return`${e} bottom: 20px; left: 20px;`;case"bottom-right":return`${e} bottom: 20px; right: 20px;`;case"center-bottom":return`${e} bottom: 20px; left: 50%; transform: translateX(-50%);`;case"center-top":return`${e} top: 20px; left: 50%; transform: translateX(-50%);`;case"center":return`${e} top: 50%; left: 50%; transform: translate(-50%, -50%);`;default:return`${e} top: 20px; left: 50%; transform: translateX(-50%);`}},U=function(){if(document.getElementById("notify-zh-styles"))return;let t=document.createElement("style");t.id="notify-zh-styles",t.textContent=`
      .${B} {
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
      .${E} {
        animation: showOpacity 1s;
      }
      .${R} {
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
    `,document.head.appendChild(t)},X=function(t){let e=`${V}-${t}`,n=document.getElementById(e);if(!n){n=document.createElement("div"),n.id=e;let i=l(this,o,T).call(this,t);n.style.cssText=i;let c=document.createElement("div");c.id=`${k}-${t}`,c.style.display="flex",c.style.flexDirection=t.includes("bottom")?"column":"column-reverse",c.style.alignItems="center",n.appendChild(c),document.body.appendChild(n)}return n},q=function(t){var S,L,v,w,A,M;let{type:e,message:n,icon:i}=t,c=D(this,N)._++,u=(L=(S=a(this,r).backgrounds)==null?void 0:S[e])!=null?L:"#000",d=(w=(v=a(this,r).classNames)==null?void 0:v.base)!=null?w:B,O=(M=(A=a(this,r).classNames)==null?void 0:A[e])!=null?M:`notify-${e}`,p=document.createElement("div");p.className=`${d} ${O}`,p.id=`notify-${c}`;let $=document.createElement("span");if($.textContent=n,i!=null&&i.el){let _=document.createElement("span");_.innerHTML=i==null?void 0:i.el,p.appendChild(_)}return p.appendChild($),p.style.display="flex",p.style.alignItems="center",p.style.background=u,p},W=function(t){var i,c,u,d;let e=(c=(i=a(this,r).classNames)==null?void 0:i.animateOut)!=null?c:R,n=(d=(u=a(this,r).classNames)==null?void 0:u.animateIn)!=null?d:E;t.addEventListener("animationend",()=>{t.remove()},{once:!0}),t.classList.remove(n),t.classList.add(e)},Y=function(t){var n,i;let e=(i=(n=a(this,r).classNames)==null?void 0:n.animateIn)!=null?i:E;t.style.opacity="0",requestAnimationFrame(()=>{t.addEventListener("animationend",()=>{},{once:!0}),t.classList.add(e),t.style.opacity="1"})},h=function(t){var d,O,p;!a(this,g)&&!a(this,r).disableDefaultStyles&&(l(this,o,U).call(this),C(this,g,!0));let e=(O=(d=t.position)!=null?d:a(this,r).position)!=null?O:"center-top",i=l(this,o,X).call(this,e).querySelector(`#${k}-${e}`);if(!i){console.error("Notify zh: Notification wrapper not available.");return}let c=l(this,o,q).call(this,t),u=(p=t.time)!=null?p:a(this,r).defaultTime;i.appendChild(c),l(this,o,Y).call(this,c),setTimeout(()=>{l(this,o,W).call(this,c)},u)};var Z=new P,et=Z;export{et as default};
//# sourceMappingURL=index.mjs.map