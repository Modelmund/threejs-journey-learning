import{h as x,i as f,S as v,j as y,a as m,k as b,g as h,l as M,m as j,n as L,o as S,P as T,C as k,W as z,b as C}from"./three.module.ebe9e46f.js";import{O as H}from"./OrbitControls.cbb81cef.js";import{G as P}from"./dat.gui.module.fa9eec39.js";const A=`<h1>materials</h1>
<ul>
<li>materials are used to put a color on each visible pixel of the geometried. The algorithms are written in programs called shaders.</li>
<li>Normals are information that contains the direction of the outside of the face. Can be use for lighting, reflection, refraction, etc.</li>
<li>Matcap will display a color by using the normals as a reference to pick the right color on a texture that looks like a sphere.
<ol>
<li>to find matcaps\uFF1A https://github.com/nidorx/matcaps</li>
</ol>
</li>
<li>Depth, \u53EF\u4EE5\u7528\u6765\u521B\u5EFA\u4F8B\u5982\u96FE\u7684\u573A\u666F</li>
<li>standard
<ol>
<li>aoMap\uFF1A\u73AF\u5883\u5149\u906E\u853D\uFF0C\u4F7F\u7528\u540E\u4F1A\u6839\u636E\u73AF\u5883\u5149\u4EA7\u751F\u660E\u6697\u5DEE\u5F02</li>
<li>displacementMap\uFF1A\u6839\u636E\u8D34\u56FE\u7EB9\u7406\u4EA7\u751F\u7F51\u683C\u70B9\u4F4D\u79FB\uFF0C\u4ECE\u5E73\u9762\u8D34\u56FE\u8F6C\u6362\u4E3A\u4E0E\u7ACB\u4F53\u5B9E\u4F53\u76F8\u540C\u7684\u7ED3\u679C\uFF08\u6CE8\u610F\uFF1A\u7F51\u683C\u70B9\u7684\u6570\u91CF\u4F1A\u5F71\u54CD\u4F4D\u79FB\u7ED3\u679C\uFF0C\u7F29\u653E\u7A0B\u5EA6displacementScale\u4E5F\u4F1A\u5F71\u54CD\uFF09</li>
</ol>
</li>
</ul>
<h1>environment map</h1>
<ul>
<li>where to find: <a href="https://polyhaven.com/">HDRIHaven</a></li>
<li>how to use
<ol>
<li>check the license : cc0</li>
<li>download the hdri files</li>
<li>convert to cube maps, use online tool(https://matheowis.github.io/HDRI-to-CubeMap/) \u9009\u62E9\u7B2C\u4E09\u79CD\uFF0C\u516D\u5F20\u72EC\u7ACB\u56FE\u7247</li>
</ol>
</li>
</ul>
`,n=new x;n.load("/textures/door/color.jpg");n.load("/textures/door/alpha.jpg");n.load("/textures/door/ambientOcclusion.jpg");n.load("/textures/door/height.jpg");n.load("/textures/door/metalness.jpg");n.load("/textures/door/normal.jpg");n.load("/textures/door/roughness.jpg");n.load("/textures/matcaps/8.png");n.load("/textures/gradients/5.jpg");const G=new f,R=G.load(["/textures/environmentMaps/0/px.jpg","/textures/environmentMaps/0/nx.jpg","/textures/environmentMaps/0/py.jpg","/textures/environmentMaps/0/ny.jpg","/textures/environmentMaps/0/pz.jpg","/textures/environmentMaps/0/nz.jpg"]),u=document.querySelector("canvas.webgl"),D=document.querySelector("div#md");D.innerHTML=A;const t={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{t.width=window.innerWidth,t.height=window.innerHeight,o.aspect=t.width/t.height,o.updateProjectionMatrix(),c.setSize(t.width,t.height),c.setPixelRatio(Math.min(window.devicePixelRatio,2))});const l=new v,e=new y;e.metalness=.7;e.roughness=.2;e.envMap=R;const a=new m(new b(.5,64,64),e);a.position.x=-1.5;a.geometry.setAttribute("uv2",new h(a.geometry.attributes.uv.array,2));const s=new m(new M(1,1,100,100),e);s.geometry.setAttribute("uv2",new h(s.geometry.attributes.uv.array,2));const r=new m(new j(.3,.2,64,128),e);r.position.x=1.5;r.geometry.setAttribute("uv2",new h(r.geometry.attributes.uv.array,2));l.add(a,s,r);const I=new L(16711680,.5);l.add(I);const p=new S(16777215,.5);p.position.x=2;p.position.y=3;p.position.z=4;l.add(p);const o=new T(75,t.width/t.height,.1,100);o.position.z=3;l.add(o);new k(o);const g=new H(o,u);g.enableDamping=!0;const d=new P;d.add(e,"metalness").min(0).max(1).step(1e-4);d.add(e,"roughness").min(0).max(1).step(1e-4);d.add(e,"aoMapIntensity").min(0).max(10).step(1e-4);d.add(e,"displacementScale").min(0).max(1).step(1e-4);d.add(e.normalScale,"x").min(0).max(1).step(1e-4);const c=new z({canvas:u});c.setSize(t.width,t.height);const W=new C,w=()=>{const i=W.getElapsedTime();g.update(),a.rotation.y=.1*i,s.rotation.y=.1*i,r.rotation.y=.1*i,a.rotation.x=.1*i,s.rotation.x=.1*i,r.rotation.x=.1*i,c.render(l,o),window.requestAnimationFrame(w)};w();
