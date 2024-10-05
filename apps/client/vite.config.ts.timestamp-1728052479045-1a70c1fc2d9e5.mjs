// vite.config.ts
import * as path from "path";
import react from "file:///D:/Programming/My%20Projects/4k%20Soft/chat/node_modules/.pnpm/@vitejs+plugin-react@4.3.2_vite@5.4.8_@types+node@20.16.10_terser@5.34.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/Programming/My%20Projects/4k%20Soft/chat/node_modules/.pnpm/vite@5.4.8_@types+node@20.16.10_terser@5.34.1/node_modules/vite/dist/node/index.js";
import macrosPlugin from "file:///D:/Programming/My%20Projects/4k%20Soft/chat/node_modules/.pnpm/vite-plugin-babel-macros@1.0.6_vite@5.4.8_@types+node@20.16.10_terser@5.34.1_/node_modules/vite-plugin-babel-macros/dist/plugin.js";
import checker from "file:///D:/Programming/My%20Projects/4k%20Soft/chat/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.1_optionator@0.9.4_typescript@5.6.2_vite@5.4.8_@types+node@20.16.10_terser@5.34.1_/node_modules/vite-plugin-checker/dist/esm/main.js";
import { VitePWA } from "file:///D:/Programming/My%20Projects/4k%20Soft/chat/node_modules/.pnpm/vite-plugin-pwa@0.19.8_vite@5.4.8_@types+node@20.16.10_terser@5.34.1__workbox-build@7.1.1_@ty_2phgipzvx3l4tfyjttveuhaizm/node_modules/vite-plugin-pwa/dist/index.js";
import svgr from "file:///D:/Programming/My%20Projects/4k%20Soft/chat/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@2.79.2_typescript@5.6.2_vite@5.4.8_@types+node@20.16.10_terser@5.34.1_/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "D:\\Programming\\My Projects\\4k Soft\\chat\\apps\\client";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
      terminal: true,
      eslint: {
        dev: {
          logLevel: ["warning", "error"]
        },
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,css,md,json}"'
      },
      overlay: true
    }),
    macrosPlugin(),
    VitePWA()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@svgs": path.resolve(__vite_injected_original_dirname, "./src/assets/svgs"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@providers": path.resolve(__vite_injected_original_dirname, "./src/providers")
    }
  },
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "./dist")
  },
  preview: {
    port: 3e3,
    open: true
  },
  server: {
    host: true,
    port: 3e3,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9ncmFtbWluZ1xcXFxNeSBQcm9qZWN0c1xcXFw0ayBTb2Z0XFxcXGNoYXRcXFxcYXBwc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2dyYW1taW5nXFxcXE15IFByb2plY3RzXFxcXDRrIFNvZnRcXFxcY2hhdFxcXFxhcHBzXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUHJvZ3JhbW1pbmcvTXklMjBQcm9qZWN0cy80ayUyMFNvZnQvY2hhdC9hcHBzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgbWFjcm9zUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1iYWJlbC1tYWNyb3NcIjtcbmltcG9ydCBjaGVja2VyIGZyb20gXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgc3ZncigpLFxuICAgIGNoZWNrZXIoe1xuICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcbiAgICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgICAgZXNsaW50OiB7XG4gICAgICAgIGRldjoge1xuICAgICAgICAgIGxvZ0xldmVsOiBbXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0sXG4gICAgICAgIH0sXG4gICAgICAgIGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi9zcmMvKiovKi57anMsanN4LHRzLHRzeCxjc3MsbWQsanNvbn1cIicsXG4gICAgICB9LFxuICAgICAgb3ZlcmxheTogdHJ1ZSxcbiAgICB9KSxcbiAgICBtYWNyb3NQbHVnaW4oKSxcbiAgICBWaXRlUFdBKCksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICBcIkBjb21wb25lbnRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29tcG9uZW50c1wiKSxcbiAgICAgIFwiQHBhZ2VzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcGFnZXNcIiksXG4gICAgICBcIkBzdHlsZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9zdHlsZXNcIiksXG4gICAgICBcIkBzdmdzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXNzZXRzL3N2Z3NcIiksXG4gICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9hc3NldHNcIiksXG4gICAgICBcIkB1dGlsc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3V0aWxzXCIpLFxuICAgICAgXCJAcHJvdmlkZXJzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcHJvdmlkZXJzXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vZGlzdFwiKSxcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBwb3J0OiAzMDAwLFxuICAgIG9wZW46IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsWUFBWSxVQUFVO0FBQ25YLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGFBQWE7QUFDcEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sVUFBVTtBQU5qQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsUUFDTixLQUFLO0FBQUEsVUFDSCxVQUFVLENBQUMsV0FBVyxPQUFPO0FBQUEsUUFDL0I7QUFBQSxRQUNBLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQSxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBVSxhQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxlQUFvQixhQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3pELFVBQWUsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsV0FBZ0IsYUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDakQsU0FBYyxhQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ3BELFdBQWdCLGFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFVBQWUsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsY0FBbUIsYUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQWEsYUFBUSxrQ0FBVyxRQUFRO0FBQUEsRUFDMUM7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
