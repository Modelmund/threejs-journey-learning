import './style.css'
import * as THREE from 'three'
// console.log(THREE)



// 场景 scene
const scene = new THREE.Scene();

/**\
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,2,1),
  new THREE.MeshBasicMaterial({color: 0xff0396})
)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,2,1),
  new THREE.MeshBasicMaterial({color: 0xe3f3c6})
)
cube2.position.set(-2, 0, 0)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,2,1),
  new THREE.MeshBasicMaterial({color: 0xa0c03e})
)
cube3.position.set(2, 0, 0)

group.add(cube1, cube2, cube3);

group.position.set(0, 1, -1)
group.rotation.set(0, .8, .5)
group.scale.set(.6, 1, 1)

/**
 * 辅助坐标轴 
 */
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

/**
 * 画布尺寸size
 */
const size = {
  width: 800,
  height: 600
}

/**
 * 视图相机 camera
 */
// camera 类型和尺寸
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
// camera 位置
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = -1
scene.add(camera);

// 改变Object3D对象（此时为相机）视角中心
// camera.lookAt(mesh.position)

/**
 * 渲染 renderer
 */
const canvas = document.querySelector('canvas.group');
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(size.width, size.height)

// render
renderer.render(scene, camera)