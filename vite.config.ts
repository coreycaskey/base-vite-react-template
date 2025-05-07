import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config"; // `defineConfig` from the `vite` import does not support the "test" property

/*
  Reference: https://vitejs.dev/config/

  Prescribed Configurations
    - @vitejs/plugin-react: Standard react plugin using babel
    - vite-tsconfig-paths: Resolves TypeScript path aliases from `tsconfig.json`
    - rollup-plugin-visualizer (optional): Analyses bundle size visually
    - vite-plugin-compression: Enables gzip or Brotli compression for assets
    - vite-plugin-svgr: Import SVGs as React components

  Other Configurations
    - @vitejs/plugin-react-swc: React plugin using Speedy Web Compiler (alternative to the standard react plugin; evaluate tradeoffs)
    - vite-plugin-swa: Adds PWA capabilities for offline support

  Optional Additions for Real-World Apps
    - Environment variable validation (e.g. with zod or env-var)
    - Sentry or LogRocket source map uploads
    - Tailwind CSS integration via PostCSS
    - Asset preloading and font optimizations
    - Static asset hashing and cache busting

  Babel vs. SWC Plugin Comparison

  @vitejs/plugin-react:
    - You rely on Babel plugins (e.g. styled-components, Emotion, i18n, etc.)
    - You want maximum ecosystem compatibility and debugging precision

  @vitejs/plugin-react-swc:
    - You want faster builds and don't need custom Babel plugins
    - You're working on a large project or CI-heavy pipeline
    - You're okay with a tradeoff in plugin flexibility for speed
*/

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    compression(), // or compression({ algorithm: 'brotliCompress' })
    visualizer({ open: false }),
  ],
  build: {
    sourcemap: false, // consider true if you need error tracking with tools like Sentry
    target: "es2017", // supports all major browsers except IE11 (useful for most cases)
    outDir: "build",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
  define: {
    "process.env": {}, // for compatibility with some npm packages
  },
  resolve: {
    alias: {
      "~": "src",
    },
  },
  server: {
    open: true,
  },
  // Note: configure this as necessary to match your testing setup and needs
  test: {
    environment: "jsdom", // mimics the browser environment for React
    globals: true, // allows using `describe`, `it`, `expect` without importing
    setupFiles: "./src/setupTests.ts", // optional setup (e.g. msw, custom matchers)
    include: ["src/**/*.{test,spec}.{ts,tsx}"], // match test files
    coverage: {
      reporter: ["text", "json", "html"], // common coverage formats
      include: ["src"], // include all source files
      exclude: ["**/*.d.ts", "**/test-utils/**", "src/setupTests.ts"],
    },
  },
});
