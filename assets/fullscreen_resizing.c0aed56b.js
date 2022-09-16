import{S as d,a as c,B as w,M as h,P as m,C as u,W as g,b as p}from"./three.module.600c0fd6.js";import{O as z}from"./OrbitControls.43983444.js";const b=`<ol>
<li>\u5168\u5C4F\u65B9\u6CD5</li>
</ol>
<ul>
<li>\u6D88\u9664\u9ED8\u8BA4\u6837\u5F0F</li>
<li>html,body {overflow: hidden} \u7528\u6765\u6D88\u9664\u5728\u4E00\u4E9B\u8BBE\u5907\u4E0A\u5F53 controls.enabled \u4E3A false \u65F6\u4E0A\u4E0B\u6EDA\u52A8\u4F1A\u51FA\u73B0\u767D\u5E95\u7684\u60C5\u51B5</li>
<li>canvas \u5143\u7D20\u81EA\u8EAB\u8BBE\u7F6E position \u4E3A fixed \u6216 absolute \u503C\uFF0C\u7528\u6765\u6D88\u9664\u53EF\u80FD\u7684scrollbar</li>
</ul>
<ol start="2">
<li>\u8C03\u6574\u5927\u5C0F resize</li>
</ol>
<ul>
<li>addEventListener resize \u4E8B\u4EF6</li>
<li>\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570
<ul>
<li>\u66F4\u65B0 size \u3002 size.width = window.innerWidth; size.height = window.innerHeight</li>
<li>\u66F4\u65B0\u76F8\u673A\u7684 aspect \u548C matrix \u3002 camera.aspect = size.width / size.height; camera.updateProjectionMatrix()</li>
<li>\u66F4\u65B0 renderer \u3002 renderer.setSize(size.width, size.height)</li>
<li>\u8BBE\u7F6E\u50CF\u7D20\u6BD4\u3002 renderer.setPixelRatio(ratio)</li>
</ul>
</li>
</ul>
`,n=document.querySelector("canvas.webgl"),v=document.querySelector("div#md");v.innerHTML=b;n.addEventListener("mousemove",s=>{s.clientX/e.width-.5,-(s.clientY/e.height-.5)});const e={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,i.aspect=e.width/e.height,i.updateProjectionMatrix(),t.setSize(e.width,e.height),t.setPixelRatio(Math.min(window.devicePixelRatio,2))});window.addEventListener("dblclick",()=>{document.fullscreenElement||document.webkitFullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen():n.requestFullscreen?n.requestFullscreen():n.webkitRequestFullscreen()});const l=new d,r=new c(new w(1,1,1,10,10,10),new h({color:"yellowgreen",wireframe:!1}));l.add(r);const i=new m(75,e.width/e.height,.1,100);i.position.z=3;i.lookAt(r.position);l.add(i);const f=new u(i);l.add(f);const o=new z(i,n);o.enableDamping=!0;const t=new g({canvas:n});t.setSize(e.width,e.height);const x=new p,a=()=>{x.getElapsedTime(),o.update(),t.render(l,i),window.requestAnimationFrame(a)};a();
