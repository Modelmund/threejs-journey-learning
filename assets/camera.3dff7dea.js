import{S as c,a as m,B as d,M as u,P as h,C as w,W as p,b as C}from"./three.module.600c0fd6.js";import{O as g}from"./OrbitControls.43983444.js";const b=`<ol>
<li>\u6444\u50CF\u673A\u9635\u5217\uFF08ArrayCamera\uFF09</li>
</ol>
<ul>
<li>\u4E00\u4E2A\u5305\u542B\u591A\u4E2A\u6444\u50CF\u673A\u7684\u6570\u7EC4\u3002</li>
</ul>
<ol start="2">
<li>\u7ACB\u65B9\u76F8\u673A\uFF08CubeCamera\uFF09</li>
</ol>
<ul>
<li>\u6784\u9020\u4E00\u4E2A\u5305\u542B6\u4E2APerspectiveCameras\uFF08\u900F\u89C6\u6444\u50CF\u673A\uFF09\u7684\u7ACB\u65B9\u6444\u50CF\u673A\uFF0C \u5E76\u5C06\u5176\u62CD\u6444\u7684\u573A\u666F\u6E32\u67D3\u5230\u4E00\u4E2AWebGLCubeRenderTarget\u4E0A\u3002</li>
</ul>
<ol start="3">
<li>\u6B63\u4EA4\u76F8\u673A\uFF08OrthographicCamera\uFF09</li>
</ol>
<ul>
<li>\u6B63\u4EA4\u6295\u5F71\uFF0C \u65E0\u8BBA\u7269\u4F53\u8DDD\u79BB\u76F8\u673A\u8DDD\u79BB\u8FDC\u6216\u8005\u8FD1\uFF0C\u5728\u6700\u7EC8\u6E32\u67D3\u7684\u56FE\u7247\u4E2D\u7269\u4F53\u7684\u5927\u5C0F\u90FD\u4FDD\u6301\u4E0D\u53D8\u3002</li>
</ul>
<ol start="4">
<li>\u900F\u89C6\u76F8\u673A\uFF08PerspectiveCamera\uFF09</li>
</ol>
<ul>
<li>\u900F\u89C6\u6295\u5F71 \u7528\u6765\u6A21\u62DF\u4EBA\u773C\u6240\u770B\u5230\u7684\u666F\u8C61\uFF0C\u5B83\u662F3D\u573A\u666F\u7684\u6E32\u67D3\u4E2D\u4F7F\u7528\u5F97\u6700\u666E\u904D\u7684\u6295\u5F71\u6A21\u5F0F\u3002</li>
</ul>
<ol start="5">
<li>\u53CC\u900F\u89C6\u6444\u50CF\u673A\uFF08\u7ACB\u4F53\u76F8\u673A StereoCamera\uFF09</li>
</ol>
<ul>
<li>\u5E38\u88AB\u7528\u4E8E\u521B\u5EFA3D Anaglyph\uFF083D\u7ACB\u4F53\u5F71\u50CF\uFF09 \u6216\u8005Parallax Barrier\uFF08\u89C6\u5DEE\u5C4F\u969C\uFF09</li>
</ul>
`,t=document.querySelector("canvas.webgl"),v=document.querySelector("div#md");v.innerHTML=b;t.addEventListener("mousemove",a=>{a.clientX/e.width-.5,-(a.clientY/e.height-.5)});const e={width:800,height:600},l=new c,r=new m(new d(1,1,1,10,10,10),new u({color:"yellowgreen",wireframe:!0}));l.add(r);const n=new h(75,e.width/e.height,.1,100);n.position.z=3;n.lookAt(r.position);l.add(n);const y=new w(n);l.add(y);const i=new g(n,t);i.enableDamping=!0;const o=new p({canvas:t});o.setSize(e.width,e.height);const S=new C,s=()=>{S.getElapsedTime(),i.update(),o.render(l,n),window.requestAnimationFrame(s)};s();
