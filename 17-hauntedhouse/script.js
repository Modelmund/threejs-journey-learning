import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { html } from "./hauntedhouse.md";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// markdown
const md = document.querySelector("div#md");
md.innerHTML = html;

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera aspect
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update render
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * debug ui
 */
const gui = new dat.GUI();

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

/**
 * Textures
 */
// door
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// bricks
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

// grass
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

// 定义重复方式，避免单元纹理过大影响观感
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

// 只定义repeat并不会生效，因为(wrapS, wrapT)默认定义的包裹方式并不是repeat，而是将纹理中的最后一个像素将延伸到网格的边缘(ClampToEdgeWrapping)
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Objects
 */
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({ 
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
gui.add(floor.position, "y").name("FloorPositionY").min(-2).max(2).step(0.0001);

scene.add(floor);

/**
 * Group
 */
const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ 
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 2.5 / 2;
house.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 + 1 / 2;
roof.rotation.y = -Math.PI / 4;
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({ 
    map: doorColorTexture, // 颜色贴图
    transparent: true, // alphaMap 开启时需要
    alphaMap: doorAlphaTexture,// alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。
    aoMap: doorAmbientOcclusionTexture, // 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
    displacementMap: doorHeightTexture, // 位移贴图，需要更多坐标
    displacementScale: 0.1,
    normalMap: doorNormalTexture, // 法线贴图，只会改变光照
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture, //
  })
);
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y = 1;
door.position.z = 4 / 2 + 0.01;
house.add(door);

// bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

// 考虑是添加到 scene 还是  house
house.add(bush1, bush2, bush3, bush4);

// graves 坟墓
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2; // 在 xz 平面上旋转的角度，2 * Math.PI 能覆盖整个平面
  // radius 应该在屋子半径之外，地板半径之内的圆环区域中，同时还要考虑 grave 自身的尺寸。确保 grave 不会进入屋子和超出边界
  // 精确范围
  // const radius = 2 * Math.sqrt(2) + 0.6 / 2 + Math.random() * ((10 - 0.6 / 2) - 2 * Math.sqrt(2) - 0.6 / 2);
  // 自定义范围
  const radius = 3.5 + Math.random() * 5.5;
  const x = Math.sin(angle) * radius; // x 方向上的距离
  const z = Math.cos(angle) * radius; // z 方向上的距离

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.rotation.y = (Math.random() - 0.5) * 0.4; // 改变 grave 朝向角度
  grave.rotation.z = (Math.random() - 0.5) * 0.4; // 改变 grave 倾斜角度
  grave.position.set(x, 0.3, z); // 不适用高度的一半是为了避免倾斜时底部依然保持在平面之下

  // shadow
  grave.castShadow = true;

  graves.add(grave);
}

/**
 * lights 光线
 */
// ambientLight 环境光
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
gui
  .add(ambientLight, "intensity")
  .name("ALIntensity")
  .min(0)
  .max(1)
  .step(0.0001);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").name("MLIntensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight); // ps: 添加到 house 上而不是 scene 上

/**
 * Ghost 通过点光源模拟
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1);
const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2);
const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3);
// ================================================

/**
 * Light helpers
 */
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 8;
camera.position.y = 2;
scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('#262837');

/**
 * shadows
 */
renderer.shadowMap.enabled = true;
// ambientLight无法生成阴影
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
// roof.castShadow = true; // 因为walls也可以生成阴影，所以roof可以不需要，尽量减少shadow的使用
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

// optimize shadow maps 通常需要借助 helper 来优化
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

// 改变阴影算法
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Ghost animation
  // 设置不同的y值函数，达到更多的不确定性的效果
  const ghostAngle1 = elapsedTime * 0.5;
  ghost1.position.x = Math.sin(ghostAngle1) * 4;
  ghost1.position.z = Math.cos(ghostAngle1) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghostAngle2 = - elapsedTime * 0.32;
  ghost2.position.x = Math.sin(ghostAngle2) * 5;
  ghost2.position.z = Math.cos(ghostAngle2) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghostAngle3 = - elapsedTime * 0.18;
  ghost3.position.x = Math.sin(ghostAngle3) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.cos(ghostAngle3) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);


  controls.update();

  // update objects

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
