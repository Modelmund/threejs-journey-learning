import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui"

/**
 * textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const matchapTexture = textureLoader.load('/textures/matcaps/1.png')
// const matchapTexture = textureLoader.load('/textures/matcaps/2.png')
// const matchapTexture = textureLoader.load('/textures/matcaps/3.png')
// const matchapTexture = textureLoader.load('/textures/matcaps/4.png')
// const matchapTexture = textureLoader.load('/textures/matcaps/5.png')
// const matchapTexture = textureLoader.load('/textures/matcaps/6.png')
// const matchapTexture = textureLoader.load('/textures/matcaps/7.png')
const matchapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
// MeshToonMaterial
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// cube texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  // 注意顺序positive x, negative x, positive y, negative y, positive z, negative z
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])


// Canvas
const canvas = document.querySelector("canvas.webgl");

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

/**
 * Objects
 */
// MeshBasicMaterial 基础网格材质
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color.set('#ff0ff0')
// material.wireframe = true;

// 当要使用material的opacity或alpha, alphaMap属性时，需要设置transparent为true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture // alphaMap 白色为可见区域，黑色不可见，具体见alphaTextrue对应图片
// material.side = THREE.DoubleSide // 初始渲染的是哪边，FrontSide（default）, BackSide, DoubleSide

// MeshNormalMaterial 法线网格材质 一种把法向量映射到RGB颜色的材质。
// const material = new THREE.MeshNormalMaterial();
// material.wireframe = true;
// flatten the faces, meaning that the normals won't be interpolated? between the vertices 直接连接相邻顶点取平面渲染
// material.flatShading = true;

// MeshMatcapMaterial 由一个材质捕捉（MatCap，或光照球（Lit Sphere））纹理所定义，其编码了材质的颜色与明暗。
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matchapTexture;

// MeshDepthMaterial 深度网格材质
// const material = new THREE.MeshDepthMaterial()

/**
 * react to light 
 */
// MeshLambertMaterial Lambert网格材质,一种非光泽表面的材质，没有镜面高光。
// const material = new THREE.MeshLambertMaterial();

//MeshPhongMaterial Phong网格材质 一种用于具有镜面高光的光泽表面的材质
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100 // 光泽度
// material.specular = new THREE.Color(0xff0000) // 改变反射镜面（specular）颜色

// MeshToonMaterial 实现了卡通渲染(toon shading)
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// MeshStandardMaterial 标准网格材质 PBR
// const material = new THREE.MeshStandardMaterial();

// MeshPhysicalMaterial 物理网格材质, MeshStandardMaterial的扩展，提供了更高级的基于物理的渲染属性
// const material = new THREE.MeshPhysicalMaterial();
// // material.side = THREE.DoubleSide
// // material.metalness = 0.45 // 金属度 default value = 0
// // material.roughness = 0.65 // 粗糙度 default value = 1
// material.map = doorColorTexture;

// material.aoMap = doorAmbientOcclusionTexture;// AmbientOcclusion,环境光遮蔽；环境遮挡
// material.aoMapIntensity = 1;// 强度

// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05

// material.roughnessMap = doorRoughnessTexture;

// material.metalnessMap = doorMetalnessTexture;

// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5)

// material.alphaMap = doorAlphaTexture
// material.transparent = true

// environment map 
// threejs only supports cube environment maps
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture;

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
)
torus.position.x = 1.5
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus);

/**
 * lights 光线
 */
// ambientLight 环境光
const ambientLight = new THREE.AmbientLight(0xff0000, 0.5)
scene.add(ambientLight)

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
// camera.lookAt(mesh.position);

scene.add(camera);

const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * debug ui
 */
const gui = new dat.GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)
gui.add(material.normalScale,'x').min(0).max(1).step(0.0001)

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
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.1 * elapsedTime
  plane.rotation.x = 0.1 * elapsedTime
  torus.rotation.x = 0.1 * elapsedTime

  // mesh.rotation.y = elapsedTime / 2;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
