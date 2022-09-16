import{S as v,h as z,n as P,D as T,C as m,t as C,o as H,j as k,a as c,k as D,l as g,M as E,P as j,W as R,K as I,b as G}from"./three.module.600c0fd6.js";import{O as q}from"./OrbitControls.43983444.js";import{G as F}from"./dat.gui.module.fa9eec39.js";import"./RectAreaLightHelper.f9db3fa3.js";const W=`<h1>shadows</h1>
<ul>
<li>the dark shadow in the back of the objects are <strong>core shadows</strong>, what we are missing are the <strong>drop shadows</strong></li>
</ul>
<h1>threejs \u5185\u7F6E\u5B9E\u65F63D\u6E32\u67D3\u65B9\u6848\u539F\u7406</h1>
<ol>
<li>when you do one render, Threejs will do a render for <strong>each</strong> light supporting shadows</li>
<li>Those renders will simulate what the light sees as if it was a camera</li>
<li>During these lights renders, a <strong>MeshDepthMaterial</strong> replaces all meshes materials</li>
<li>The lights renders are stored as textures and we call those <strong>shadow maps</strong></li>
<li>They are then used on every materials supposed to shadows and projected on the geometry</li>
</ol>
<h1>shadowMap</h1>
<ol>
<li>renderer.shadowMap.enabled = true; // \u5F00\u542Fshadow</li>
<li>Object3D (mesh, light..) \u51B3\u5B9A castShadow (\u5149\u7EBF\u7ECF\u8FC7\u4F1A\u4EA7\u751F\u9634\u5F71) \u8FD8\u662F receiveShadow \uFF08\u63A5\u6536\u9634\u5F71\u7684\u6295\u5F71\uFF09</li>
</ol>
<h1>support shadow lights</h1>
<ol>
<li>pointLight</li>
<li>DirectionalLight</li>
<li>SpotLight</li>
</ol>
<h1>shadow map optimize</h1>
<ol>
<li>mapSize -&gt; mipmapping</li>
<li>near and far -&gt; details</li>
<li>radius -&gt; blur</li>
<li>renderer.shadowMap.type -&gt; algorithms
<ul>
<li>THREE.BasicDepthPacking: Very perfaomant but lousy(\u6781\u574F\u7684\uFF0C\u6076\u52A3\u7684\uFF1B) quality</li>
<li>THREE.PCFShadowMap: Less perfaomant but smoother edges(default)</li>
<li>THREE.PCFSoftShadowMap: Less perfaomant but even softer edges &gt; lose radius(blur)</li>
<li>THREE.VSMShadowMap: Less perfaomant, more constraints, can have unexpected results</li>
</ul>
</li>
</ol>
<h1>bake shadows</h1>
<ul>
<li>\u51CF\u5C11\u76F4\u63A5\u5229\u7528\u5149\u7EBF\u751F\u6210\u9634\u5F71\uFF0C\u800C\u662F\u5C3D\u53EF\u80FD\u591A\u7684\u4F7F\u7528\u7EB9\u7406</li>
<li>renderer.shadowMap.enabled = false;</li>
<li>\u4F7F\u7528baked shadows(\u7528\u5728receiveShadow\u7684Mesh\u4E0A\uFF0C\u6539\u53D8\u8BE5mesh\u7684material\u7684map\u5C5E\u6027\u3002ps\uFF1A\u8FD9\u79CD\u60C5\u51B5\u4E0B\u751F\u6210\u7684\u9634\u5F71\u662F\u9759\u6001\u7684\uFF0C\u4E0D\u4F1A\u968F\u7740\u88AB\u6295\u5F71\u7684\u7269\u4F53\u7684\u79FB\u52A8\u800C\u79FB\u52A8)</li>
</ul>
`,u=document.querySelector("canvas.webgl"),A=document.querySelector("div#md");A.innerHTML=W;const s={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{s.width=window.innerWidth,s.height=window.innerHeight,d.aspect=s.width/s.height,d.updateProjectionMatrix(),l.setSize(s.width,s.height),l.setPixelRatio(Math.min(window.devicePixelRatio,2))});const o=new F,a=new v,f=new z;f.load("/textures/bakedShadow.jpg");const O=f.load("/textures/simpleShadow.jpg"),S=new P(16777215,.3);a.add(S);o.add(S,"intensity").name("ALIntensity").min(0).max(1).step(1e-4);const e=new T(16777215,.3);a.add(e);e.position.set(2,2,-1);o.add(e,"intensity").name("DLIntensity").min(0).max(1).step(1e-4);o.add(e.position,"x").min(-5).max(5).step(1e-4);o.add(e.position,"y").min(-5).max(5).step(1e-4);o.add(e.position,"z").min(-5).max(5).step(1e-4);e.castShadow=!0;e.shadow.mapSize.width=1024;e.shadow.mapSize.height=1024;e.shadow.camera.right=2;e.shadow.camera.top=2;e.shadow.camera.left=-2;e.shadow.camera.bottom=-2;e.shadow.camera.near=1;e.shadow.camera.far=6;e.shadow.radius=10;const M=new m(e.shadow.camera);M.visible=!1;a.add(M);const t=new C(16777215,.3,10,Math.PI*.3);t.castShadow=!0;t.position.set(0,2,2);a.add(t);a.add(t.target);t.shadow.mapSize.width=1024;t.shadow.mapSize.height=1024;t.shadow.camera.fov=30;t.shadow.camera.near=1;t.shadow.camera.far=6;t.shadow.radius=10;const x=new m(t.shadow.camera);x.visible=!1;a.add(x);const i=new H(16777215,.3);i.castShadow=!0;i.position.set(-1,1,0);a.add(i);i.shadow.mapSize.width=1024;i.shadow.mapSize.height=1024;i.shadow.camera.near=.1;i.shadow.camera.far=5;i.shadow.radius=10;const b=new m(i.shadow.camera);b.visible=!1;a.add(b);const w=new k;w.roughness=.7;o.add(w,"metalness").min(0).max(1).step(1e-4);o.add(w,"roughness").min(0).max(1).step(1e-4);const n=new c(new D(.5,64,64),w);n.castShadow=!0;const h=new c(new g(5,5),w);h.receiveShadow=!0;h.rotation.x=-Math.PI/2;h.position.y=-.48;o.add(h.position,"y").name("PlanePositionY").min(-2).max(2).step(1e-4);a.add(n,h);const r=new c(new g(1.5,1.5),new E({color:0,transparent:!0,alphaMap:O}));r.rotation.x=-Math.PI/2;r.position.y=h.position.y+.01;a.add(r);const d=new j(75,s.width/s.height,.1,100);d.position.z=3;a.add(d);const y=new q(d,u);y.enableDamping=!0;const l=new R({canvas:u});l.setSize(s.width,s.height);l.shadowMap.type=I;const B=new G,L=()=>{const p=B.getElapsedTime();y.update(),n.position.x=Math.cos(p)*1.5,n.position.z=Math.sin(p)*1.5,n.position.y=Math.abs(Math.sin(p*3)),r.position.x=n.position.x,r.position.z=n.position.z,r.material.opacity=(1-Math.abs(n.position.y))*.6,l.render(a,d),window.requestAnimationFrame(L)};L();
