import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { html } from "./lights.md";
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
const gui = new dat.GUI()

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * lights 光线
 */
// ambientLight 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.0001)

// directionalLight 平行光
const directionalLight = new THREE.DirectionalLight(0xffff3c, 0.5)
scene.add(directionalLight)
directionalLight.position.set(1, 0.25, 0) // 改变平行光光源位置

// HemisphereLight 半球光 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1)
scene.add(hemisphereLight)

// pointLight 点光源 案例： 灯泡
const pointLight = new THREE.PointLight(0xff9000, 0.5, 100); // distance 表示光到光源强度为0的距离，可以理解为光能照到多远
scene.add(pointLight);
pointLight.position.set(1, -0.5, 1)

// rectareaLight 平面光光源 only MeshStandardMaterial and MeshPhysicalMaterial 案例： 光透过窗户
const rectareaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectareaLight)
rectareaLight.position.set(-1.5, 0, 1.5)
rectareaLight.lookAt(new THREE.Vector3()) // 让光面向指定坐标，此处为坐标中心

// spotLight 聚光灯 penumbra 半影区：影响到光的照到面的边缘 手电筒🔦
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
scene.add(spotLight)
spotLight.position.set(0, 2, 3)
// 聚光灯的方向是从它的位置到目标位置.默认的目标位置为原点 (0,0,0)。
// 注意: 对于目标的位置，要将其更改为除缺省值之外的任何位置，它必须被添加到 scene 场景中去。
// 也就是要实现的聚光灯的旋转，实际上是改变聚光灯target的位置，通过改变target的位置，使灯光照像不同的位置，从而达到模拟旋转的效果
spotLight.target.position.x = -0.75;
scene.add(spotLight.target); // target对象本身没有添加到scene中

/**
 * Light helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
// 变更target坐标(即spotLight.target.position)时，spotLightHelper在当前帧不会随着光线发生变化，需要在下一个帧进行更新
window.requestAnimationFrame(
  () => {
    spotLightHelper.update();
  }
)

const rectAreaLightHelper = new RectAreaLightHelper(rectareaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// MeshStandardMaterial需要光线(Lights)才能显示
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
// material.side = THREE.DoubleSide;
// const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
)
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
)
torus.position.x = 1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(5, 5),
  material
)

plane.rotation.x = -Math.PI / 2;
// plane.rotation.z = Math.PI / 8;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  // update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  cube.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
