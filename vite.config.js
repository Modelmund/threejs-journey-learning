import { resolve } from "path";
import { defineConfig } from "vite";
import mdPlugin, { Mode } from "vite-plugin-markdown";

export default defineConfig({
  plugins: [
    mdPlugin.default({
      mode: Mode.HTML,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        basic: resolve(__dirname, "03-basic-scene/index.html"),
        animation: resolve(__dirname, "06-animation/index.html"),
        camera: resolve(__dirname, "07-camera/index.html"),
        fsar: resolve(__dirname, "08-fullscreen&resizing/index.html"),
        geometry: resolve(__dirname, "09-geometry/index.html"),
        debugui: resolve(__dirname, "10-debugui/index.html"),
        textures: resolve(__dirname, "11-textures/index.html"),
        matreial: resolve(__dirname, "12-materials/index.html"),
        threedtext: resolve(__dirname, "13-3d-text/index.html"),
      },
    },
  },
  server: {
    hmr: true
  }
});
