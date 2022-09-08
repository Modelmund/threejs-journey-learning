import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { html } from "./textures.md";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// markdown
const md = document.querySelector("div#md");
md.innerHTML = html;

// Textures
// 方案一 Texture
// const image = new Image();
// const colorTexture = new THREE.Texture(image)
// image.onload = () => {
//   colorTexture.needsUpdate = true;// 在事件触发后改执行，可以使texture变量在函数外部声明，避免了变量的作用域问题
// };
// image.src = '/textures/door/color.jpg'

// 方案二 TextureLoader 一个loader可以加载多个图片
// const textureLoader = new THREE.TextureLoader();
// const colorTexture = textureLoader.load('/textures/door/color.jpg', () => {
//   console.log('loaded') // 回调，有三个回调函数
// })

// 方案三
const loadingManager = new THREE.LoadingManager();
// 以构造函数参数或实例对象属性的方式声明各种事件的回调。使用统一的回调来替代单独设置回调的代码冗余
loadingManager.onStart = () => {
  console.log("start");
};
loadingManager.onLoad = () => {
  console.log("loaded");
};
loadingManager.onProgress = () => {
  console.log("progress");
};
loadingManager.onError = () => {
  console.log("error");
};
const textureLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png') // minFilter
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')// magFilter
const colorTexture = textureLoader.load("/textures/minecraft.png"); // magFilter
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// 重复
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// 纹理贴图在水平方向如何包裹
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// 纹理贴图在垂直方向如何包裹
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// 偏移
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// 旋转 默认以面的左下角的点为中心
// colorTexture.rotation = Math.PI / 4
//改变旋转中心
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// while minFilter === THREE.NearestFilter, we don't need the mipmaps
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;

colorTexture.magFilter = THREE.NearestFilter;

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

// Scene
const scene = new THREE.Scene();

const box = new THREE.BoxGeometry(1, 1, 1);
// console.log(box.attributes.uv)

const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});

const mesh = new THREE.Mesh(box, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
camera.lookAt(mesh.position);

scene.add(camera);

const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  // mesh.rotation.y = elapsedTime / 2;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
