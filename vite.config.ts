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
    alias: { "@": path.resolve(process.cwd(), "client/src") },
    dedupe: ["react", "react-dom"],
  },

  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false, // pode voltar p/ false quando acabar o debug
    cssMinify: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        // separa vendors de forma estável (Win/Mac/Linux)
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return;

          const has = (pkg: string) =>
            new RegExp(`[\\\\/]node_modules[\\\\/]${pkg}[\\\\/]`).test(id);

          if (has("react") || has("react-dom")) return "vendor-react";
          if (has("@radix-ui")) return "vendor-radix";
          if (has("@tanstack")) return "vendor-query";
          if (has("framer-motion")) return "vendor-motion";
          if (has("@supabase")) return "vendor-supabase";

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
