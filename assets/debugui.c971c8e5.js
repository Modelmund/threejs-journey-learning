import{S as h,B as m,M as w,a as p,P as u,C as g,W as b,b as f}from"./three.module.600c0fd6.js";import{O as x}from"./OrbitControls.43983444.js";import{g as y}from"./index.56cf7046.js";import{G as C}from"./dat.gui.module.fa9eec39.js";const v=`<h1>debug ui</h1>
<ul>
<li>\u7528\u4E8E\u8C03\u8BD5\u56FE\u5F62,\u5373threejs\u5B98\u7F51examples\u4E2D\u7684\u8C03\u8BD5\u9762\u677F</li>
<li>\u53EF\u4EE5\u81EA\u884C\u521B\u5EFA\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u73B0\u6709\u7684\u5E93</li>
<li>\u5E93
<ol>
<li><a href="https://github.com/dataarts/dat.gui">dat.GUI</a></li>
<li>control-panel</li>
<li>ControlKit</li>
<li>Guify</li>
<li>Oui</li>
</ol>
</li>
</ul>
<h1>\u521B\u5EFAdebugui</h1>
<ol>
<li>\u521B\u5EFAgui</li>
<li>\u6DFB\u52A0\u53EF\u914D\u7F6E\u9879</li>
<li>\u81EA\u5B9A\u4E49\u53C2\u6570</li>
<li>\u81EA\u5B9A\u4E49\u89E6\u53D1\u51FD\u6570</li>
</ol>
<h1>demo</h1>
<p>https://jsfiddle.net/ikatyang/182ztwao</p>
<h1>documentation</h1>
<ul>
<li>api: https://github.com/dataarts/dat.gui/blob/HEAD/API.md</li>
</ul>
`,r=document.querySelector("canvas.webgl"),M=document.querySelector("div#md");M.innerHTML=v;const o={color:16711680,spin:()=>{y.to(e.rotation,{duration:3,y:e.rotation.y+Math.PI*2})}},i={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{i.width=window.innerWidth,i.height=window.innerHeight,n.aspect=i.width/i.height,n.updateProjectionMatrix(),a.setSize(i.width,i.height),a.setPixelRatio(Math.min(window.devicePixelRatio,2))});const s=new h,S=new m(1,1,1,2,2,2),l=new w({color:o.color,wireframe:!0}),e=new p(S,l);s.add(e);const n=new u(75,i.width/i.height,.1,100);n.position.z=3;n.lookAt(e.position);s.add(n);new g(n);const d=new x(n,r);d.enableDamping=!0;const t=new C;t.hide();t.add(e.position,"x",-3,3,.01);t.add(e.position,"y",-3,3,.01);t.add(e.position,"z").min(-3).max(3).step(.01).name("scale");t.add(e,"visible");t.add(l,"wireframe");t.addColor(o,"color").onChange(()=>{l.color.set(o.color)});t.add(o,"spin");const a=new b({canvas:r});a.setSize(i.width,i.height);const z=new f,c=()=>{z.getElapsedTime(),d.update(),a.render(s,n),window.requestAnimationFrame(c)};c();
