import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Performance-optimized Vite config for production
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Remove prop-types in production
          'transform-react-remove-prop-types',
          // Optimize React renders
          'transform-react-pure-class-to-function'
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
  build: {
    // Maximum optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor'
            }
            return 'vendor'
          }
          
          // Component chunks
          if (id.includes('/components/landing/')) {
            return 'landing-components'
          }
          if (id.includes('/components/ui/')) {
            return 'ui-components'
          }
        }
      }
    },
    
    // Target modern browsers for smaller bundles
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Source maps only for debugging
    sourcemap: false,
    
    // Optimize chunk size
    chunkSizeWarningLimit: 500
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-hook-form',
      '@hookform/resolvers/zod'
    ],
    exclude: [
      // Exclude heavy dependencies that should be loaded dynamically
      'framer-motion'
    ]
  },
  
  // Server optimizations
  server: {
    hmr: {
      overlay: false
    }
  }
})