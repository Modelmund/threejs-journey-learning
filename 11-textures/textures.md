# textures
* PBR Physics Basic Rendering
  1. https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
  2. https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

* UV unwrapping
  1. 将物体展开到平面uv 坐标系中
  2. geometry.attributes.uv

* Transform textures
  1. repeat
  2. offset
  3. rotation

* 
  1. minification filter
  2. maxification filter

* textures
  1. weight
    a. jpg: lossy compression but usually lighter
    b. png: lossless compression but usually heavier
    c. TinyPNG
  2. size
    * mipmapping
        a. will produce a half smaller version of the texture repeatedly until 1x1
        b. base on a, the texture width and height must be a power of 2, such as 512*512, 1024*1024 or 512*2048.
  3. data
    * textures support transparency but we can't have it in .jpg, if we want to have only one texture that combine color and alpha, we better use .png.

# difficulty:
  Find the right combination of texture formats and resulations

# where to find textures
1. http://poliigon.com
2. http://3dtextures.me
3. http://arroway-textures.ch
4. https://substance3d.com/

# mipmapping(https://en.wikipedia.org/wiki/Mipmap)
* 为了加快渲染速度和减少图像锯齿，贴图被处理成由一系列被预先计算和优化过的图片组成的文件,这样的贴图被称为 MIP map 或者 mipmap。
* Mipmap中每一个层级的小图都是主图的一个特定比例的缩小细节的复制品。虽然在某些必要的视角，主图仍然会被使用，来渲染完整的细节。但是当贴图被缩小或者只需要从远距离观看时，mipmap就会转换到适当的层级。事实上，在三线性过滤（trilinear filtering）起作用时，会在两个相近的层级之间切换。

因为mipmap贴图需要被读取的像素远少于普通贴图，所以渲染的速度得到了提升。而且操作的时间减少了，因为mipmap的图片已经是做过抗锯齿处理的，从而减少了实时渲染的负担。放大和缩小也因为mipmap而变得更有效率。

如果贴图的基本尺寸是256x256像素的话,它mipmap就会有8个层级。每个层级是上一层级的四分之一的大小，依次层级大小就是：128x128;64x64;32x32;16x16;8x8;4x4;2x2;1x1(一个像素)。例如在一个场景中，渲染贴图需要填满的空间大小是40x40像素的话，如果没有三线性过滤，那32x32 会被放大显示，或者有三线性过滤，会在64x64和32x32之间切换。最简单的生成贴图的方法就是依次做平均，当然也可以用更加高级的算法。