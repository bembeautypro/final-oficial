// vite.config.ts
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const ANALYZE = process.env.ANALYZE === "true";

export default defineConfig({
  root: "client",
  publicDir: "public",

  resolve: {
    alias: { "@": path.resolve(process.cwd(), "client/src") },
    dedupe: ["react", "react-dom"],
  },

  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: true,        // ← ligue para termos stacktrace claro
    cssMinify: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 1024,
    // ⚠️ sem rollupOptions/manualChunks — deixe o Vite decidir
  },

  plugins: [
    react(),
    ...(ANALYZE
      ? [visualizer({ filename: "dist/stats.html", template: "treemap", gzipSize: true, brotliSize: true, open: false })]
      : []),
  ],

  server: { port: 5173 },
});
