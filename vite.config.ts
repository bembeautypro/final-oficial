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

  // vite.config.ts (trecho)
build: {
  outDir: path.resolve(import.meta.dirname, "dist"),
  emptyOutDir: true,
  sourcemap: false, // pode voltar p/ false quando acabar o debug
  cssMinify: true,
  minify: "esbuild",
  chunkSizeWarningLimit: 1024,
  rollupOptions: {
    output: {
      manualChunks(id: string) {
        if (!id.includes("node_modules")) return;

        // Só separa grupos bem específicos:
        if (/node_modules\/react\/|node_modules\/react-dom\//.test(id)) return "vendor-react";
        if (/node_modules\/@radix-ui\//.test(id)) return "vendor-radix";
        if (/node_modules\/@tanstack\//.test(id)) return "vendor-query";
        if (/node_modules\/framer-motion\//.test(id)) return "vendor-motion";
        if (/node_modules\/@supabase\//.test(id)) return "vendor-supabase";

        // Tudo o que sobrar vai para "vendor"
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
