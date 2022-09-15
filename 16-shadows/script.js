import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { html } from "./shadows.md";
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const bakedShadowTexture = textureLoader.load('/textures/bakedShadow.jpg');
const simpleShadowTexture = textureLoader.load('/textures/simpleShadow.jpg');

/**
 * helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * lights 光线
 */
// ambientLight 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
gui
  .add(ambientLight, "intensity")
  .name("ALIntensity")
  .min(0)
  .max(1)
  .step(0.0001);

// directionalLight 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
scene.add(directionalLight);
directionalLight.position.set(2, 2, -1); // 改变平行光光源位置
gui
  .add(directionalLight, "intensity")
  .name("DLIntensity")
  .min(0)
  .max(1)
  .step(0.0001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.0001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.0001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.0001);
directionalLight.castShadow = true;
// shadow相关信息
// console.log(directionalLight.shadow)

/**
 * shadow map optimize
 */
// mapSize 改变shadow map size width = x, height = y; 默认为512, 保持为2的指数，用于mipmapping
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// near and far
// console.log(directionalLight.shadow.camera) // camera type: OrthographicCamera, 因为时平行光照射，所以是正交相机
// 缩小相机范围，从而达到放大物体在相机中的比例的效果，此时物体的细节也会更多，渲染效果更好
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// 值越小阴影越精确，但是如果过小就会导致阴影被剪切（cropped）,甚至无法生成,eg:
// directionalLight.shadow.camera.far = 3.5;

// radius 控制 shadow blur
directionalLight.shadow.radius = 10;

// algorithms shadow map algorithms
// THREE.BasicDepthPacking, THREE.PCFShadowMap（default）,THREE.PCFSoftShadowMap,THREE.VSMShadowMap
// change it on shadowMap.type property at the renderer object

// camera helper (OrthographicCamera)
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false; // 隐藏相机辅助
scene.add(directionalLightCameraHelper);

// ================================================

// spotLight (PerspectiveCamera, 6个方向)
const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target)

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.fov = 30;
// spotLight.shadow.camera.aspect = 2;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

spotLight.shadow.radius = 10;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false; // 隐藏相机辅助
scene.add(spotLightCameraHelper);

// ================================================
// pointLight
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.castShadow = true;
pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

// pointLight.shadow.camera.aspect = 2;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;

pointLight.shadow.radius = 10;

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false; // 隐藏相机辅助
scene.add(pointLightCameraHelper);

// ================================================

/**
 * Light helpers
 */
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper);

/**
 * Objects
 */
// MeshStandardMaterial需要光线(Lights)才能显示
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
// material.side = THREE.DoubleSide;
// const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);

sphere.castShadow = true;

// 1. use light generates shadows
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);

// 2. use textures to apply  shadow textures (static)
// const plane = new THREE.Mesh(
//   new THREE.PlaneBufferGeometry(5, 5),
//   new THREE.MeshBasicMaterial({
//     map: bakedShadowTexture
//   })
// )

plane.receiveShadow = true;

plane.rotation.x = -Math.PI / 2;
// plane.rotation.z = Math.PI / 8;
plane.position.y = -0.48;
gui.add(plane.position, "y").name("PlanePositionY").min(-2).max(2).step(0.0001);

scene.add(sphere, plane);

// 3. create a slightly plane above the floor with an alphaMap using the simpleShadowTexture
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadowTexture
  })
)
sphereShadow.rotation.x = - Math.PI / 2;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
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
// active shadowMap on renderer
// renderer.shadowMap.enabled = true;
// 改变阴影算法
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  // update objects
  // 让球体运动
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // 让阴影跟着球体运动
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 0.6;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
