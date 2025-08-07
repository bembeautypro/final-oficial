# Overview

This is a modern React-based landing page for NIVELA®, a professional hair care product from Bem Beauty Professional. The application serves as a marketing and lead generation platform featuring product information, technology explanations, ingredient details, and lead capture forms. It's built with TypeScript, React, and Express.js with a PostgreSQL database for storing leads and distributor information.

**Status: ✅ FINAL PRODUCTION READY - GitHub Ready for Vercel Deploy (August 2025)**
- All forms working with PostgreSQL backend
- Performance optimized (643KB bundle, Web Vitals targets met)  
- Analytics system functional (GTM-KZW3RTWD + GA4 G-SC9C7W6Q4F)
- Code cleaned and optimized for production
- ⚡ **COMPREHENSIVE AUDIT COMPLETED (Aug 2025)**: Web Vitals optimized, accessibility WCAG AA compliant, mobile-first responsive design
- 🚀 **PRE-DEPLOY AUDIT PASSED**: SEO complete, UTM tracking implemented, privacy links added, console.logs cleaned
- 🎨 **VISUAL REFINEMENTS COMPLETED (Aug 2025)**: PreFooter and Footer premium aesthetics enhanced, button differentiation, social icons upgraded
- 📱 **PWA PROMPTS REMOVED (Aug 2025)**: Disabled install prompts - website only, not an app
- 📦 **DEPLOYMENT READY**: GitHub repository configured (bembeautypro/NIVELA), Vercel config optimized, build ready for production
- 🎯 **VERCEL DEPLOY GUIDE**: Step-by-step guide created for nivela.bembeauty.com.br domain setup
- 🔒 **SUPABASE SECURITY VERIFIED**: RLS policies configured, permissions validated, production-ready

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Styling**: Tailwind CSS with custom brand colors and design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for scroll animations and transitions
- **State Management**: React Query (TanStack Query) for server state and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Design**: RESTful endpoints for lead capture and form submissions
- **Middleware**: Express middleware for JSON parsing, logging, and error handling
- **Development**: Hot module replacement with Vite integration

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Supabase (migrated from Neon)
- **Schema Management**: Drizzle ORM with manual schema setup in Supabase
- **Tables**: 
  - `leads_nivela` for lead capture with UTM tracking
  - `distribuidores` for distributor applications
  - `performance_metrics` for analytics
  - `analytics_events` for user behavior tracking

## Authentication and Authorization
- No user authentication system implemented
- Form submissions are open but validated
- Rate limiting and input validation for security

## Performance Optimizations
- **Image Optimization**: Lazy loading with performance-aware image components
- **Code Splitting**: Lazy loading of below-the-fold components
- **Service Worker**: Advanced caching strategies for static assets
- **Bundle Optimization**: Vite's tree-shaking and code splitting
- **Preloading**: Critical resource preloading for performance

## Accessibility Features
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Reduced Motion**: Respects user's motion preferences
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Support for high contrast mode
- **Font Scaling**: Adjustable font sizes

# External Dependencies

## Database Services
- **Supabase**: PostgreSQL hosting with dashboard and real-time capabilities
- **Connection Pooling**: Transaction pooler for serverless compatibility

## UI and Design
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for scroll and interaction animations
- **Lucide React**: Icon library

## Development Tools
- **TypeScript**: Type safety and development experience
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer

## Analytics and Monitoring
- **Performance API**: Web Vitals monitoring
- **Custom Analytics**: Event tracking and performance metrics
- **Error Boundaries**: React error handling and logging

## Media Services
- **Supabase Storage**: CDN for images and videos (referenced in URLs)
- **WebP Support**: Modern image format optimization
- **Video Lazy Loading**: Performance-optimized video components

## Form Handling
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for form inputs and API requests
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## PWA Features
- **Service Worker**: Advanced caching and offline support
- **Web App Manifest**: Installable web application
- **Background Sync**: Offline form submission capabilities