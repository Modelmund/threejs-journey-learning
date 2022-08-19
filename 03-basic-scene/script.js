import './style.css'
import * as THREE from 'three'
// console.log(THREE)



// 场景 scene
const scene = new THREE.Scene();

/**
 * 几何体Geometry Object3D
 */
const geometry = new THREE.BoxGeometry(1,1,1 );

/**
 * 网格材质Material Object3D
 */
const material = new THREE.MeshBasicMaterial({color: 'yellowgreen'})

/**
 * 网格Mesh Object3D
 */
const mesh = new THREE.Mesh(geometry, material)
// console.log(mesh)
scene.add(mesh);
// 网格几何中心坐标 相对于坐标原点 position Vector3
// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.position.z = 1
mesh.position.set(0.7, - 0.6, 1)

/**
 * 直线距离，欧几里德长度
 */
//  console.log(mesh.position.length()) // (0, 0, 0) 到 mesh position 的欧几里德长度，即直线距离。此例中为(0, 0, 0)到(0.7, - 0.6, 1)的欧几里德长度）
//  console.log(mesh.position.distanceTo(camera.position)) //mesh position 到任一位置(new Vector3(x, y, z))的欧几里德长度。此例中为(0.7, - 0.6, 1)到 camera.position (3, 0, 0)的欧几里德长度 

/**
 * 将向量转化为单位向量
 */
// mesh.position.normalize()
// console.log(mesh.position.length()) // 1

/**
 * Scale 缩放 position Vector3
 */
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5)

/**\
 * 旋转 rotation / quaternion（四元法） rotation Euler
 * 绕自身坐标轴旋转
 * 转动后自身的坐标轴方向也会改变
 * 默认转动顺序为x -> y -> z，与代码编写的先后顺序无关。
 * 当某一个轴不能使用时，就会出现Gimal lock，也就是万向节锁
 */
//解决方法 reorder 改变执行顺序
mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI / 4
mesh.rotation.x = Math.PI / 4

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
camera.lookAt(mesh.position)

/**
 * 渲染 renderer
 */
const canvas = document.querySelector('canvas.webgl');
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(size.width, size.height)

// render
renderer.render(scene, camera)