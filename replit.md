# NIVELA® Landing Page

## Overview
This project is a professional landing page for NIVELA®, a premium hair treatment product from Bem Beauty Professional. It showcases advanced hair retexturizing technology, including ASTRO QUAT V3®, and is designed to convert professional hair stylists and distributors. The page emphasizes international quality standards and aims for maximum conversion through optimized design, user experience, and performance.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript.
- **Build System**: Vite.
- **Styling**: Tailwind CSS with custom NIVELA® brand colors, using Radix UI primitives and shadcn/ui patterns.
- **State Management**: React Query for server state.
- **Routing**: Wouter.
- **Animations**: Framer Motion for scroll animations.
- **Forms**: React Hook Form with Zod validation.

### Backend
- **Runtime**: Node.js with Express.js for REST API.
- **Database**: PostgreSQL via Supabase with Drizzle ORM.
- **Schema Management**: Drizzle Kit for database migrations.

### UI/UX Decisions
The design focuses on a premium aesthetic aligned with the NIVELA® brand. Key decisions include:
- Typography optimization (Montserrat as primary font).
- Mobile-first approach with responsive consistency and optimized breakpoints.
- Enhanced touch targets (44px+ minimum) and microinteractions.
- Accessibility (WCAG AA+, iOS HIG, Material Design guidelines) with improved focus states and ARIA labels.
- Brand colors: dark blue background (`#0d181c`) and gold (`#D4AF37`).

### Performance Optimizations
- **Bundle Size**: Optimized to ~207KB gzipped.
- **Image Optimization**: Custom lazy loading with WebP/AVIF formats and `fetchpriority='high'` for critical images.
- **Code Splitting**: Dynamic imports.
- **Caching**: Service Worker for advanced caching; Express headers for asset caching.
- **Critical Rendering Path**: Inline critical CSS, skeleton loading, `font-display: swap` for fonts.
- **CLS Zero Target**: `aspect-ratio` on all images to prevent layout shift.

### Feature Specifications
- **Lead Generation Forms**: Simplified forms with fields for Name, Email, and WhatsApp. Integrated directly with Supabase via Express API endpoints (`/api/leads`, `/api/distribuidores`).
- **Analytics Tracking**: Comprehensive Google Tag Manager (GTM) and Google Analytics 4 (GA4) integration for event tracking, including form submissions, video progress, and Core Web Vitals.
- **UTM Persistence**: Capture and persistence of UTM parameters for campaign attribution.
- **WhatsApp Integration**: Direct links with UTM injection.

## External Dependencies

- **Supabase**: PostgreSQL database, Supabase Storage for assets.
- **Vercel**: Production hosting and automatic deployments.
- **npm**: Package management.
- **Google Tag Manager**: `GTM-KZW3RTWD` for analytics.
- **Google Analytics 4**: For advanced event tracking and conversion measurement.
- **WhatsApp**: Direct communication link.
- **Instagram & YouTube**: Social media integration.