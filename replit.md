# NIVELA® Landing Page - Project Documentation

## Overview

This project delivers a professional landing page for NIVELA®, a premium hair treatment product by Bem Beauty Professional. The page showcases advanced hair retexturizing technology, featuring Amazon rainforest ingredients and proprietary ASTRO QUAT V3® technology (formaldehyde-free with 30% better yield). The primary purpose is to convert professional hair stylists and distributors, emphasizing international quality standards and aiming for maximum conversion through an optimized user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build System**: Vite
- **Styling**: Tailwind CSS with custom NIVELA® brand design system, using Radix UI primitives and shadcn/ui patterns
- **State Management**: React Query for server state
- **Routing**: Wouter
- **Animations**: Framer Motion for scroll animations
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js for REST API
- **Database**: PostgreSQL via Supabase with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations

### Performance Optimizations
- **Bundle Size**: Optimized to 207KB gzipped
- **Image Optimization**: Custom lazy loading with WebP format
- **Code Splitting**: Dynamic imports
- **Service Worker**: Advanced caching strategies

### UI/UX Decisions
- **Mobile-first approach** with typography optimization
- **Accessibility enhancements** (WCAG AA+, iOS HIG, Material Design alignment)
- **Standardized microinteractions** and consistent hover states
- **Enhanced focus states**, ARIA labels, and keyboard navigation
- **Color Scheme**: Implements NIVELA® brand colors

### Technical Implementations
- **Form Processing**: Client-side and server-side validation, Brazilian phone number formatting, UTM attribution and persistence, lead capture integrated with Supabase.
- **Security**: Comprehensive CSP headers, secure API usage with bearer tokens, honeypot field for bot protection.
- **Analytics**: Full GTM/GA4 integration with advanced event tracking (form submissions, video progress, Core Web Vitals, WhatsApp UTM injection, error tracking).

## External Dependencies

### Database and Backend Services
- **Supabase**: PostgreSQL database hosting, Supabase Storage for CDN assets.
- **Drizzle ORM**: Type-safe database operations.

### Development and Deployment
- **Vercel**: Production hosting.
- **Replit**: Development environment.
- **npm**: Package management.

### Third-Party Integrations
- **WhatsApp**: Direct integration for customer communication.
- **Social Media**: Instagram and YouTube integration.
- **Google Tag Manager**: GTM-KZW3RTWD container.
- **Google Analytics 4**: Advanced event tracking.