import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { html } from "./geometry.md"

// Canvas
const canvas = document.querySelector("canvas.webgl");

// markdown
const md = document.querySelector('div#md')
md.innerHTML = html

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};
canvas.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

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

// 双击实现全屏
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if(!fullscreenElement) {
    canvas.requestFullscreen ? canvas.requestFullscreen() : canvas.webkitRequestFullscreen(); // requestFullscreen无法在safari上使用，所以需要webkit前缀
  } else {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen();
  }
})

// Scene
const scene = new THREE.Scene();

// Object
// widthSegments, heightSegments, depthSegments 指在对应方向上物体分段数量
// const box = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)


/**
// 自定义BufferGeometry
// 1. 定义空白geometry ps: 数据需要使用typed array，方便计算机处理Uint8Array，Uint16Array，Uint32Array，Float64Array
const geometry = new THREE.BufferGeometry()
// 2. 定义typed array数据
const positionArr = new Float32Array([
  0,0,1,
  0,1,0,
  1,0,0
])
// 或者
// const positionArr = new Float32Array(9)
// positionArr[0] = 0
// positionArr[1] = 0
// positionArr[2] = 0

// positionArr[3] = 0
// positionArr[4] = 1
// positionArr[5] = 0

// positionArr[6] = 1
// positionArr[7] = 0
// positionArr[8] = 0

// 3. 将数组转化为bufferAttribute
const positionAttribute = new THREE.BufferAttribute(positionArr, 3)// 3的取值与顶点坐标位数相关

// 4. 设置属性
geometry.setAttribute('position', positionAttribute)
*/

// 多个平面
const geometry = new THREE.BufferGeometry()
const count = 357; // 三角形个数
const positionArr = new Float32Array(count * 3 * 3) // 三角形数 * 每个三角形顶点数 * 每个顶点坐标数
for (let i = 0; i < count * 3 * 3; i++) {
  positionArr[i] = (Math.random() - 0.5) * 3; // - 0.5 是为了保证图形坐标能以0为分界点，图形能位于界面中间。 * 4 是放大图形
}
const positionAttribute = new THREE.BufferAttribute(positionArr, 3)
geometry.setAttribute('position', positionAttribute)



const material = new THREE.MeshBasicMaterial({ color: "yellowgreen", wireframe: true })
const mesh = new THREE.Mesh(geometry, material);
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
// console.log(mesh.position)
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  mesh.rotation.y = elapsedTime / 2;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
