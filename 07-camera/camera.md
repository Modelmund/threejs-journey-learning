1. 摄像机阵列（ArrayCamera）
  * 一个包含多个摄像机的数组。
2. 立方相机（CubeCamera）
 * 构造一个包含6个PerspectiveCameras（透视摄像机）的立方摄像机， 并将其拍摄的场景渲染到一个WebGLCubeRenderTarget上。
 3. 正交相机（OrthographicCamera）
 *  正交投影， 无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
 4. 透视相机（PerspectiveCamera）
 *  透视投影 用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
 5. 双透视摄像机（立体相机 StereoCamera）
 * 常被用于创建3D Anaglyph（3D立体影像） 或者Parallax Barrier（视差屏障）