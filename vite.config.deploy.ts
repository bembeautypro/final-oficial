import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Build específico para Vercel - bundle otimizado com code splitting avançado
export default defineConfig({
  plugins: [react()],
  root: "client",
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    target: 'es2018',
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      treeshake: true,
      input: path.resolve(__dirname, "client/index.html"),
      output: {
        manualChunks(id) {
          // Separar libs conhecidas do vendor principal
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('framer') || id.includes('motion')) return 'vendor-motion';
            if (id.includes('lodash') || id.includes('date-fns') || id.includes('dayjs')) return 'vendor-utils';
            if (id.includes('@radix-ui') || id.includes('@hookform')) return 'vendor-ui';
            if (id.includes('@tanstack') || id.includes('query')) return 'vendor-query';
            return 'vendor';
          }
          // Splitar seções/components que não são críticos
          if (id.includes('/src/components/landing/') && 
              (id.includes('FAQ') || id.includes('Distributor') || id.includes('Footer'))) {
            return 'sections';
          }
          return null;
        }
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});