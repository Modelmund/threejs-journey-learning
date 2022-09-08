import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";
import { html } from "./debugui.md"

// console.log(dat)

// Canvas
const canvas = document.querySelector("canvas.webgl");

// markdown
const md = document.querySelector('div#md')
md.innerHTML = html

// 自定义debugui参数，因为创建material时需要用到，所以放在前面
// 使用该变量创建material的原因：为了避免debugui控制面板颜色和实际material的颜色不一致
const parameters = {
  color: 0xff0000,
  spin: () => {
    // 需要关闭tick()中的动画，冲突可能会导致动画失效
    gsap.to(mesh.rotation, { duration: 3, y: mesh.rotation.y + Math.PI * 2})
  }
}

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

const box = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
 
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: true,
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

/**
 * Debug
 */
// 1. 创建gui
const gui = new dat.GUI(); // 参数：{closed: true, width: 400}, closed: true 控制板默认折叠，不传时默认展开; width: 400 尺寸
gui.hide(); // 初始默认隐藏，通过H键控制显隐
// 2. 添加可配置项
// gui.add(mesh.position, 'z', -3, 3, 0.01)
gui.add(mesh.position, "x", -3, 3, 0.01);
gui.add(mesh.position, "y", -3, 3, 0.01);
// 等价于 .name 改变"z"的标签名
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name('scale');
gui.add(mesh, 'visible')// 是否可见
gui.add(material, 'wireframe') // 结构样式
// 3. 自定义参数
gui.addColor(parameters, 'color' ).onChange(() => {
  // onChange事件，当颜色改变时触发，执行material的color属性的set方法来改变颜色
  material.color.set(parameters.color)
})
// 4. 自定义触发函数
gui.add(parameters, 'spin') // 需要将函数放入一个对象中

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
