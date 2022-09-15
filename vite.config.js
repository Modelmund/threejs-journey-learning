import { defineConfig } from "vite";
import mdPlugin, { Mode } from "vite-plugin-markdown";
import { generateRoutes } from './utils/utils.js';

export default defineConfig({
  plugins: [
    mdPlugin.default({
      mode: Mode.HTML,
    }),
  ],
  build: {
    rollupOptions: {
      input: generateRoutes(),
    },
  },
  server: {
    hmr: true
  }
});
