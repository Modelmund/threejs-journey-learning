1. 全屏方法
  * 消除默认样式
  * html,body {overflow: hidden} 用来消除在一些设备上当 controls.enabled 为 false 时上下滚动会出现白底的情况
  * canvas 元素自身设置 position 为 fixed 或 absolute 值，用来消除可能的scrollbar

2. 调整大小 resize
  * addEventListener resize 事件
  * 事件回调函数
    * 更新 size 。 size.width = window.innerWidth; size.height = window.innerHeight
    * 更新相机的 aspect 和 matrix 。 camera.aspect = size.width / size.height; camera.updateProjectionMatrix()
    * 更新 renderer 。 renderer.setSize(size.width, size.height)
    * 设置像素比。 renderer.setPixelRatio(ratio)