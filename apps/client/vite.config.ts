import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
      terminal: true,
      eslint: {
        dev: {
          logLevel: ["warning", "error"],
        },
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,css,md,json}"',
      },
      overlay: true,
    }),
    macrosPlugin(),
    VitePWA(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@svgs": path.resolve(__dirname, "./src/assets/svgs"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@providers": path.resolve(__dirname, "./src/providers"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "./dist"),
  },
  preview: {
    port: 3000,
    open: true,
  },
  server: {
    host: true,
    port: 3000,
    open: true,
  },
});
