import{h,N as r,S as m,B as u,M as g,a as w,P as x,C as b,W as f,L as y,b as v}from"./three.module.ebe9e46f.js";import{O as M}from"./OrbitControls.cbb81cef.js";const P=`<h1>textures</h1>
<ul>
<li>
<p>PBR Physics Basic Rendering</p>
<ol>
<li>https://marmoset.co/posts/basic-theory-of-physically-based-rendering/</li>
<li>https://marmoset.co/posts/physically-based-rendering-and-you-can-too/</li>
</ol>
</li>
<li>
<p>UV unwrapping</p>
<ol>
<li>\u5C06\u7269\u4F53\u5C55\u5F00\u5230\u5E73\u9762uv \u5750\u6807\u7CFB\u4E2D</li>
<li>geometry.attributes.uv</li>
</ol>
</li>
<li>
<p>Transform textures</p>
<ol>
<li>repeat</li>
<li>offset</li>
<li>rotation</li>
</ol>
</li>
<li>
<ol>
<li>minification filter</li>
<li>maxification filter</li>
</ol>
</li>
<li>
<p>textures</p>
<ol>
<li>weight
a. jpg: lossy compression but usually lighter
b. png: lossless compression but usually heavier
c. TinyPNG</li>
<li>size</li>
</ol>
<ul>
<li>mipmapping
a. will produce a half smaller version of the texture repeatedly until 1x1
b. base on a, the texture width and height must be a power of 2, such as 512<em>512, 1024</em>1024 or 512*2048.</li>
</ul>
<ol start="3">
<li>data</li>
</ol>
<ul>
<li>textures support transparency but we can't have it in .jpg, if we want to have only one texture that combine color and alpha, we better use .png.</li>
</ul>
</li>
</ul>
<h1>difficulty:</h1>
<p>Find the right combination of texture formats and resulations</p>
<h1>where to find textures</h1>
<ol>
<li>http://poliigon.com</li>
<li>http://3dtextures.me</li>
<li>http://arroway-textures.ch</li>
<li>https://substance3d.com/</li>
</ol>
<h1>mipmapping(https://en.wikipedia.org/wiki/Mipmap)</h1>
<ul>
<li>\u4E3A\u4E86\u52A0\u5FEB\u6E32\u67D3\u901F\u5EA6\u548C\u51CF\u5C11\u56FE\u50CF\u952F\u9F7F\uFF0C\u8D34\u56FE\u88AB\u5904\u7406\u6210\u7531\u4E00\u7CFB\u5217\u88AB\u9884\u5148\u8BA1\u7B97\u548C\u4F18\u5316\u8FC7\u7684\u56FE\u7247\u7EC4\u6210\u7684\u6587\u4EF6,\u8FD9\u6837\u7684\u8D34\u56FE\u88AB\u79F0\u4E3A MIP map \u6216\u8005 mipmap\u3002</li>
<li>Mipmap\u4E2D\u6BCF\u4E00\u4E2A\u5C42\u7EA7\u7684\u5C0F\u56FE\u90FD\u662F\u4E3B\u56FE\u7684\u4E00\u4E2A\u7279\u5B9A\u6BD4\u4F8B\u7684\u7F29\u5C0F\u7EC6\u8282\u7684\u590D\u5236\u54C1\u3002\u867D\u7136\u5728\u67D0\u4E9B\u5FC5\u8981\u7684\u89C6\u89D2\uFF0C\u4E3B\u56FE\u4ECD\u7136\u4F1A\u88AB\u4F7F\u7528\uFF0C\u6765\u6E32\u67D3\u5B8C\u6574\u7684\u7EC6\u8282\u3002\u4F46\u662F\u5F53\u8D34\u56FE\u88AB\u7F29\u5C0F\u6216\u8005\u53EA\u9700\u8981\u4ECE\u8FDC\u8DDD\u79BB\u89C2\u770B\u65F6\uFF0Cmipmap\u5C31\u4F1A\u8F6C\u6362\u5230\u9002\u5F53\u7684\u5C42\u7EA7\u3002\u4E8B\u5B9E\u4E0A\uFF0C\u5728\u4E09\u7EBF\u6027\u8FC7\u6EE4\uFF08trilinear filtering\uFF09\u8D77\u4F5C\u7528\u65F6\uFF0C\u4F1A\u5728\u4E24\u4E2A\u76F8\u8FD1\u7684\u5C42\u7EA7\u4E4B\u95F4\u5207\u6362\u3002</li>
</ul>
<p>\u56E0\u4E3Amipmap\u8D34\u56FE\u9700\u8981\u88AB\u8BFB\u53D6\u7684\u50CF\u7D20\u8FDC\u5C11\u4E8E\u666E\u901A\u8D34\u56FE\uFF0C\u6240\u4EE5\u6E32\u67D3\u7684\u901F\u5EA6\u5F97\u5230\u4E86\u63D0\u5347\u3002\u800C\u4E14\u64CD\u4F5C\u7684\u65F6\u95F4\u51CF\u5C11\u4E86\uFF0C\u56E0\u4E3Amipmap\u7684\u56FE\u7247\u5DF2\u7ECF\u662F\u505A\u8FC7\u6297\u952F\u9F7F\u5904\u7406\u7684\uFF0C\u4ECE\u800C\u51CF\u5C11\u4E86\u5B9E\u65F6\u6E32\u67D3\u7684\u8D1F\u62C5\u3002\u653E\u5927\u548C\u7F29\u5C0F\u4E5F\u56E0\u4E3Amipmap\u800C\u53D8\u5F97\u66F4\u6709\u6548\u7387\u3002</p>
<p>\u5982\u679C\u8D34\u56FE\u7684\u57FA\u672C\u5C3A\u5BF8\u662F256x256\u50CF\u7D20\u7684\u8BDD,\u5B83mipmap\u5C31\u4F1A\u67098\u4E2A\u5C42\u7EA7\u3002\u6BCF\u4E2A\u5C42\u7EA7\u662F\u4E0A\u4E00\u5C42\u7EA7\u7684\u56DB\u5206\u4E4B\u4E00\u7684\u5927\u5C0F\uFF0C\u4F9D\u6B21\u5C42\u7EA7\u5927\u5C0F\u5C31\u662F\uFF1A128x128;64x64;32x32;16x16;8x8;4x4;2x2;1x1(\u4E00\u4E2A\u50CF\u7D20)\u3002\u4F8B\u5982\u5728\u4E00\u4E2A\u573A\u666F\u4E2D\uFF0C\u6E32\u67D3\u8D34\u56FE\u9700\u8981\u586B\u6EE1\u7684\u7A7A\u95F4\u5927\u5C0F\u662F40x40\u50CF\u7D20\u7684\u8BDD\uFF0C\u5982\u679C\u6CA1\u6709\u4E09\u7EBF\u6027\u8FC7\u6EE4\uFF0C\u90A332x32 \u4F1A\u88AB\u653E\u5927\u663E\u793A\uFF0C\u6216\u8005\u6709\u4E09\u7EBF\u6027\u8FC7\u6EE4\uFF0C\u4F1A\u572864x64\u548C32x32\u4E4B\u95F4\u5207\u6362\u3002\u6700\u7B80\u5355\u7684\u751F\u6210\u8D34\u56FE\u7684\u65B9\u6CD5\u5C31\u662F\u4F9D\u6B21\u505A\u5E73\u5747\uFF0C\u5F53\u7136\u4E5F\u53EF\u4EE5\u7528\u66F4\u52A0\u9AD8\u7EA7\u7684\u7B97\u6CD5\u3002</p>
`,s=document.querySelector("canvas.webgl"),j=document.querySelector("div#md");j.innerHTML=P;const i=new y;i.onStart=()=>{console.log("start")};i.onLoad=()=>{console.log("loaded")};i.onProgress=()=>{console.log("progress")};i.onError=()=>{console.log("error")};const t=new h(i),l=t.load("/textures/minecraft.png");t.load("/textures/door/alpha.jpg");t.load("/textures/door/ambientOcclusion.jpg");t.load("/textures/door/height.jpg");t.load("/textures/door/metalness.jpg");t.load("/textures/door/normal.jpg");t.load("/textures/door/roughness.jpg");l.generateMipmaps=!1;l.minFilter=r;l.magFilter=r;const e={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,n.aspect=e.width/e.height,n.updateProjectionMatrix(),o.setSize(e.width,e.height),o.setPixelRatio(Math.min(window.devicePixelRatio,2))});const a=new m,L=new u(1,1,1),S=new g({map:l}),p=new w(L,S);a.add(p);const n=new x(75,e.width/e.height,.1,100);n.position.z=3;n.lookAt(p.position);a.add(n);new b(n);const d=new M(n,s);d.enableDamping=!0;const o=new f({canvas:s});o.setSize(e.width,e.height);const k=new v,c=()=>{k.getElapsedTime(),d.update(),o.render(a,n),window.requestAnimationFrame(c)};c();
