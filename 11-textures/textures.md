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
    * mip mapping
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