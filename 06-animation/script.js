import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
// console.log(THREE)

// 场景 scene
const scene = new THREE.Scene();

/**
 * 几何体Geometry Object3D
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);

/**
 * 网格材质Material Object3D
 */
const material = new THREE.MeshBasicMaterial({ color: "yellowgreen" });

/**
 * 网格Mesh Object3D
 */
const mesh = new THREE.Mesh(geometry, material);
// console.log(mesh)

scene.add(mesh);

/**
 * 辅助坐标轴
 */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * 画布尺寸size
 */
const size = {
  width: 800,
  height: 600,
};

/**
 * 视图相机 camera
 */
// camera 类型和尺寸
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
// camera 位置
camera.position.z = 3;
// camera.position.x = 1
// camera.position.y = -1
scene.add(camera);

// 改变Object3D对象（此时为相机）视角中心
camera.lookAt(mesh.position);

/**
 * 渲染 renderer
 */
const canvas = document.querySelector("canvas.webgl");
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);

gsap.to(mesh.position, { duration: 2, delay: 1, x: 2 })

// 方案1
//let time = Date.now();

// 方案2
// const clock = new THREE.Clock();

// Animation
const tick = () => {
  // Time
  // 方案1: 计算帧率， 避免动画过快或过慢
  // const currentTime = Date.now();
  // const delta = currentTime - time;
  // time = currentTime;
  // mesh.rotation.z += .002 * delta;

  // 方案2： 使用Threejs内置Clock类
  // elpased time 运行时间、经过时间、已用时间，默认从0开始
  // const elapsedTime = clock.getElapsedTime()
  // console.log(elapsedTime)
  // ps: 注意此处是直接赋值
  // mesh.rotation.x  = elapsedTime

  // 常见函数
  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)

  // camera.lookAt(mesh.position)

  // render
  // greensock(gsap) 内部会调用requestAnimationFrame, 所以动画不需要手动更新，但是render仍需要手动触发
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
