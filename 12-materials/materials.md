# materials
* materials are used to put a color on each visible pixel of the geometried. The algorithms are written in programs called shaders.
* Normals are information that contains the direction of the outside of the face. Can be use for lighting, reflection, refraction, etc.
* Matcap will display a color by using the normals as a reference to pick the right color on a texture that looks like a sphere.
  1. to find matcaps： https://github.com/nidorx/matcaps
* Depth, 可以用来创建例如雾的场景
* standard
  1. aoMap：环境光遮蔽，使用后会根据环境光产生明暗差异
  2. displacementMap：根据贴图纹理产生网格点位移，从平面贴图转换为与立体实体相同的结果（注意：网格点的数量会影响位移结果，缩放程度displacementScale也会影响）

# environment map
* where to find: [HDRIHaven](https://polyhaven.com/)
* how to use
  1. check the license : cc0
  2. download the hdri files
  3. convert to cube maps, use online tool(https://matheowis.github.io/HDRI-to-CubeMap/) 选择第三种，六张独立图片
