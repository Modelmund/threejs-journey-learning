import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "dat.gui";
import { html } from "./3d-text.md";

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
 * Scene
 */
const scene = new THREE.Scene();

/**
 * helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/5.png");

/**
 * Fonts
 */
const fontLoader = new FontLoader();
// ps: fontLoader.load()方法没有返回值，与textureLoader.load()方法不同，所以需要在回调中操作
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello World", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 6, // 弯曲，曲线
    bevelEnabled: true, //bevel 斜面，斜角
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // center the text 字符居中
  /**
   * 方案1: 使用边界bounding
   */
  // // 1. 计算边界
  // textGeometry.computeBoundingBox();
  // // 2. 移动几何体
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - 0.02) / 2, // 需要减去bevelSize
  //   - (textGeometry.boundingBox.max.y - 0.02) / 2, // 需要减去bevelSize
  //   - (textGeometry.boundingBox.max.z - 0.03) / 2, // 需要减去bevelThickness
  // )

  /**
   * 方案2: 使用center api
   */
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  // const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture});
  // textMaterial.wireframe = true;
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  // console.time('donuts')
  // 添加donuts（甜甜圈）
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
  // const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture}) // 使用textMaterial替代
  for (let i = 0; i < 1000; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    scene.add(donut);
    // 改变位置
    donut.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
    // 改变角度
    donut.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    // 改变大小
    const scale = Math.random(); // 确保同一个mesh在各个方向上的缩放程度一致
    donut.scale.set(scale, scale, scale);
  }
  // console.timeEnd('donuts')
});

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
  // mesh.rotation.y = elapsedTime / 2;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
