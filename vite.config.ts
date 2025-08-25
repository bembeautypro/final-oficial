// vite.config.ts
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const ANALYZE = process.env.ANALYZE === "true";

export default defineConfig({
  // a pasta do seu index.html
  root: "client",

  // serve estáticos a partir de client/public
  publicDir: "public",

  resolve: {
    alias: { "@": path.resolve(process.cwd(), "client/src")},
    dedupe: ["react", "react-dom"],
  },

  build: {
    // gera dist/ na raiz do repo (fora de client/)
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,

    // deixe ligado só enquanto depura
    sourcemap: true,

    cssMinify: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 1024,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("@tanstack")) return "vendor-query";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@supabase")) return "vendor-supabase";
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
