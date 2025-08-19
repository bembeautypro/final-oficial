// vite.config.ts
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig(async ({ mode }) => {
  const plugins = [
    react(),
    splitVendorChunkPlugin(), // mantém o split de vendors
  ];

  // Importa o visualizer apenas quando explicitamente pedido
  if (mode === "analyze" || process.env.ANALYZE === "true") {
    const { visualizer } = await import("rollup-plugin-visualizer");
    plugins.push(
      visualizer({
        filename: "dist/stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
        open: false,
      })
    );
  }

  return {
    root: ".",
    base: "/",
    publicDir: "client/public",
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      target: "es2019",
      cssMinify: "lightningcss",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client/src"),
      },
    },
    server: { port: 5173 },
    preview: { port: 4173 },
    plugins,
  };
});
