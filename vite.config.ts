// vite.config.ts
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ativa o visualizer só quando você rodar: `npm run build -- --mode analyze`
import { visualizer } from 'rollup-plugin-visualizer';

// Pequena ajuda pra decidir se é prod
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig(({ mode }) => {
  const cfg: UserConfig = {
    plugins: [
      react(),
      ...(mode === 'analyze'
        ? [visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true, brotliSize: true })]
        : []),
    ],
    build: {
      outDir: 'dist',
      // só esconde o warning; o ganho real vem do manualChunks abaixo
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      sourcemap: false,
      target: 'es2018',
      // “limpa” o bundle em produção
      minify: isProd ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            // buckets separados para melhor cache e paralelismo
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (
              id.includes('framer-motion') ||
              id.includes('@radix-ui') ||
              id.includes('swiper') ||
              id.includes('gsap')
            ) {
              return 'vendor-ui';
            }
            if (
              id.includes('date-fns') ||
              id.includes('zod') ||
              id.includes('zustand') ||
              id.includes('lodash') ||
              id.includes('clsx')
            ) {
              return 'vendor-utils';
            }
            // fallback de terceiros
            return 'vendor';
          },
          // nomes estáveis ajudam cache
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
        // treeshake mais agressivo e seguro
        treeshake: {
          preset: 'recommended',
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false,
        },
      },
      // remove console/debug em prod
      terserOptions: undefined,
      // alternativa com esbuild (mais rápido) para tirar console em prod:
      // esbuild: isProd ? { drop: ['console', 'debugger'] } : undefined,
    },
    // evita warnings de dependências CJS
    optimizeDeps: {
      include: [],
    },
  };

  return cfg;
});
