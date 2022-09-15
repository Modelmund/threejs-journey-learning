# shadows
* the dark shadow in the back of the objects are **core shadows**, what we are missing are the **drop shadows**

# threejs 内置实时3D渲染方案原理
1. when you do one render, Threejs will do a render for **each** light supporting shadows
2. Those renders will simulate what the light sees as if it was a camera
3. During these lights renders, a **MeshDepthMaterial** replaces all meshes materials
4. The lights renders are stored as textures and we call those **shadow maps**
5. They are then used on every materials supposed to shadows and projected on the geometry

# shadowMap
1. renderer.shadowMap.enabled = true; // 开启shadow
2. Object3D (mesh, light..) 决定 castShadow (光线经过会产生阴影) 还是 receiveShadow （接收阴影的投影）

# support shadow lights
1. pointLight
2. DirectionalLight
3. SpotLight

# shadow map optimize
1. mapSize -> mipmapping
2. near and far -> details
3. radius -> blur
4. renderer.shadowMap.type -> algorithms
    * THREE.BasicDepthPacking: Very perfaomant but lousy(极坏的，恶劣的；) quality
    * THREE.PCFShadowMap: Less perfaomant but smoother edges(default)
    * THREE.PCFSoftShadowMap: Less perfaomant but even softer edges > lose radius(blur)
    * THREE.VSMShadowMap: Less perfaomant, more constraints, can have unexpected results

# bake shadows
* 减少直接利用光线生成阴影，而是尽可能多的使用纹理
* renderer.shadowMap.enabled = false;
* 使用baked shadows(用在receiveShadow的Mesh上，改变该mesh的material的map属性。ps：这种情况下生成的阴影是静态的，不会随着被投影的物体的移动而移动)