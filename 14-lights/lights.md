# 性能影响
* minimal cost
  AmbientLight, HemisphericLight
* moderate cost
  DirectionalLight, PointLight
* high cost
  SpotLight, RectAreaLight
* 使用光线会影响性能，尤其是光线多的情况下，因此，尽量减少在threejs中使用光线，多使用textures纹理贴图来实现。bake the light into the texture（在3d建模软件中完成）
