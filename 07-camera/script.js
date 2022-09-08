import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { html } from  './camera.md'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// markdown
const md = document.querySelector('div#md')
md.innerHTML = html

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0
}
canvas.addEventListener('mousemove', event => {
  // 使用sizes鼠标位置与canvas尺寸的比值，使其振幅在0-1之间，可正可负，从而可以通过坐标系(四象限)来判断光标位置
  cursor.x = event.clientX / sizes.width - 0.5
  // 在javascript中，y的正方向指向屏幕下方，而threejs中，y的正方向指向屏幕上方，所以需要取反
  cursor.y = -(event.clientY / sizes.height - 0.5)
  // console.log(cursor)
  // console.log(Math.sin(cursor.x * Math.PI * 2))
})

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1,10,10,10),
    new THREE.MeshBasicMaterial({ color: 'yellowgreen', wireframe: true })
)
scene.add(mesh)
// mesh.position.set(1, 1, 1)

// mesh.rotation.y = Math.PI / 2;
// mesh.rotation.x = Math.PI / 2;


// Camera
// 构造函数中第三第四个参数不要取0.00001和9999999，尽管可以保证物体会全部出现在视锥中，但会出现z-fighting error(深度冲突) 无法判断哪个面在前面的现象
// https://twitter.com/FreyaHolmer/status/799602767081848832
// https://twitter.com/Snapman_I_Am_/status/800567120765616128
// PerspectiveCamera 透视相机（点光源，视锥体）
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100)

// 若要保持相机的纵横比例，（right-left)与(top-bottom)的比例应该与canvas宽高比一致，这样才能保证图形不被拉伸
// const aspectRatio = sizes.width / sizes.height
// OrthographicCamera 正交相机(平行光源，视景体为矩形体，参数为左边界，右边界，上边界，下边界，近端面和远端面)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
// console.log(camera.position.length())
scene.add(camera)

const helper = new THREE.CameraHelper( camera );
scene.add( helper );

// const axisHelper = new THREE.AxesHelper()
// scene.add( axisHelper );

// 方案2: 轨道控制器
// console.log(OrbitControls)
const controls = new OrbitControls(camera, canvas)
// 修改后需调用update方法才能更新视图
// controls.target.y = 1
// controls.update()
// 阻尼，使移动旋转等变换有衰减效果，更平滑，需要每一帧都更新
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()
// console.log(mesh.position)
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update camera
    // 方案1： 手动实现 自定义控制
    // 想象相机在垂直Y轴的平面上绕圈，在这个过程中 x、z轴的坐标都会改变（threejs是右手坐标系）
    // 没有cursor.z是因为在平面上无法通过鼠标改变z轴坐标
    // 三角函数用于控制旋转角度cursor.x在-0.5 - 0.5之间，也就是sin(x)的x在-PI - PI之间
    // sin(x)的平方与cos(x)的平方和为1，三角函数主要用于控制角度，后面的系数用于控制距离
    // 实现水平方向旋转360度
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    //实现垂直方向旋转
    // camera.position.y = 5 * cursor.y
    // 固定视角为mesh中心
    // camera.lookAt(mesh.position)

    // 方案2: 使用内置api
    // update controls
    controls.update()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()