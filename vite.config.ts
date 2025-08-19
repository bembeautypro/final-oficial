// vite.config.ts
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

const ANALYZE = process.env.ANALYZE === "true";

export default defineConfig({
  root: "client",
  publicDir: "public",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    cssMinify: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 1024, // só para silenciar o aviso >500 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // buckets mais comuns para reduzir o bundle inicial
          if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("@tanstack")) return "vendor-query";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@supabase")) return "vendor-supabase";

          // fallback: tudo que sobrar em "vendor"
          return "vendor";
        },
      },
    },
  },
  plugins: [
    react(),
    ...(ANALYZE
      ? [
          visualizer({
            filename: "dist/stats.html",
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            open: false,
          }),
        ]
      : []),
  ],
  server: {
    port: 5173,
  },
});
