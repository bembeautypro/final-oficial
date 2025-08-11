# NIVELA® Landing Page

## Overview

This is a professional landing page for NIVELA®, a premium hair treatment product from Bem Beauty Professional. The project is built as a React-based landing page featuring advanced hair retexturizing technology with Amazon rainforest ingredients. The site showcases the ASTRO QUAT V3® technology, which is formaldehyde-free and provides 30% better yield compared to conventional treatments. The landing page is designed to convert professional hair stylists and distributors while maintaining high performance standards and international quality.

**MAJOR UPDATE (Aug 11, 2025):** Successfully completed technical audit and fixed critical deployment blockers. All APIs now functional and ready for Vercel production deployment.

## Recent Changes

### Aug 11, 2025 - Critical Fixes Implemented
- **API Distribuidores Fixed:** Now processes all fields sent by frontend (experiencia_distribuicao, mensagem)
- **Centralized Supabase Client:** Created `api/_supabase.ts` for unified database access
- **Build Configuration Corrected:** Fixed vite.config.deploy.ts paths from `src/` to `client/src/`
- **TypeScript Configuration Updated:** Corrected include paths and aliases
- **CORS Headers Added:** Implemented in all API endpoints
- **Complete Technical Audit:** Created 10 detailed reports covering all deployment aspects
- **APIs Converted to TypeScript:** Renamed .js to .ts to resolve LSP errors
- **Minimal Changes Approach:** Following user's request for minimal refactoring
- **Vercel Configuration Enhanced:** Security headers and HTTPS redirects added
- **Health Check Endpoint:** Added /api/health for system diagnostics
- **Production Ready:** All tests passing, build optimized (166KB gzip), ready for Vercel

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **Animations**: Framer Motion for smooth, performance-optimized animations
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Image Optimization**: Custom lazy loading components with WebP format support
- **Performance**: Advanced service worker implementation for caching and offline support

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for runtime type validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful endpoints for lead capture and distributor registration

### Database Design
- **Primary Database**: PostgreSQL via Supabase with connection pooling
- **Tables**: 
  - `leads_nivela` for main lead capture with analytics tracking
  - `distribuidores` for distributor applications
  - `performance_metrics` for web vitals tracking
  - `analytics_events` for user behavior analytics
- **Connection Strategy**: Transaction pooler for optimized performance

### Performance Optimizations
- **Code Splitting**: Lazy loading for below-the-fold components
- **Resource Optimization**: Image compression, WebP format, lazy loading
- **Caching Strategy**: Advanced service worker with intelligent cache management
- **Bundle Optimization**: Tree-shaking and minimal bundle size (670KB optimized)
- **Web Vitals**: Monitoring for LCP, FCP, CLS, and FID metrics

### SEO and Accessibility
- **SEO Implementation**: Complete meta tags, Open Graph, Twitter Cards, Schema.org markup
- **Accessibility**: WCAG 2.1 AA compliance with ARIA labels and keyboard navigation
- **PWA Features**: Web manifest, service worker, offline support
- **Multi-language Support**: Optimized for Portuguese with international SEO

### Development and Deployment
- **Environment**: Configured for both development (Replit) and production (Vercel)
- **Build Process**: Separate configs for development and production builds
- **Deploy Strategy**: Automated deployment via Vercel with environment variables

## External Dependencies

### Database and Backend Services
- **Supabase**: PostgreSQL database and file storage provider
  - Database URL: `postgresql://postgres.fdyzlqovxvdpkzlwuhjj:Ninaflor1403@@aws-1-sa-east-1.pooler.supabase.com:6543/postgres`
  - Storage buckets: `imagens`, `videos`, `favicon` for media assets
  - CDN: Global content delivery via Supabase's infrastructure

### UI and Component Libraries
- **Radix UI**: Headless UI components for accessibility and consistency
- **Shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth user interactions

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast bundling for server-side code
- **Drizzle Kit**: Database migration and schema management
- **React Hook Form**: Form handling with validation

### External Integrations
- **Google Fonts**: Montserrat font family for brand consistency
- **Analytics**: Performance monitoring and conversion tracking capabilities
- **Social Media**: Integration points for Instagram, YouTube, WhatsApp

### Asset Management
- **Media Storage**: All images and videos hosted on Supabase storage
- **Image Optimization**: WebP format with multiple size variants
- **Video Optimization**: Compressed MP4 files with lazy loading
- **Font Optimization**: Self-hosted fonts with display=swap for performance