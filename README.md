# NIVELA® Landing Page

[![Production Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://nivela.bembeauty.com.br)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)

> Professional landing page for NIVELA®, a premium hair treatment product featuring ASTRO QUAT V3® technology. Built with modern React architecture, comprehensive analytics, and production-grade performance.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/[username]/nivela-landing-page.git
cd nivela-landing-page

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Analytics & Tracking](#-analytics--tracking)
- [Performance](#-performance)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Business Features
- **Professional Hair Treatment Landing Page** - Showcasing NIVELA® ASTRO QUAT V3® technology
- **Lead Generation Forms** - Optimized conversion funnels for professionals and distributors
- **UTM Campaign Tracking** - Complete attribution and campaign analytics
- **WhatsApp Integration** - Direct customer communication with campaign tracking
- **SEO Optimized** - Advanced meta tags, structured data, and social media optimization

### 🔧 Technical Features
- **React 18** with TypeScript for type safety
- **Tailwind CSS** with custom design system
- **Supabase Integration** for real-time database and storage
- **Google Analytics 4** and **Google Tag Manager** integration
- **Performance Monitoring** with Core Web Vitals tracking
- **Progressive Web App** capabilities
- **Accessibility Compliant** (WCAG 2.1 AA)

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5.x
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Query (TanStack Query)
- **Routing:** Wouter (lightweight client-side routing)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** PostgreSQL via Supabase
- **ORM:** Drizzle ORM with Drizzle Kit
- **Schema Management:** TypeScript-first with Zod validation

### Analytics & Monitoring
- **Analytics:** Google Analytics 4 (GA4)
- **Tag Management:** Google Tag Manager (GTM-KZW3RTWD)
- **Performance:** Core Web Vitals tracking
- **Error Tracking:** Integrated exception monitoring

### Development & Deployment
- **Development:** Replit for collaborative development
- **Production:** Vercel with automatic deployments
- **Database Hosting:** Supabase (PostgreSQL)
- **CDN:** Supabase Storage for optimized asset delivery

## 📁 Project Structure

```
nivela-landing-page/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Reusable UI components (shadcn/ui)
│   │   │   └── landing/       # Landing page specific components
│   │   ├── lib/               # Utilities and configurations
│   │   │   ├── supabaseClient.ts
│   │   │   ├── submit.ts      # Form submission logic
│   │   │   └── utm.ts         # UTM tracking utilities
│   │   ├── analytics/         # Analytics and tracking
│   │   │   ├── gtm.ts         # Google Tag Manager setup
│   │   │   ├── events.ts      # Event tracking logic
│   │   │   └── performance.ts # Performance monitoring
│   │   ├── hooks/             # Custom React hooks
│   │   └── pages/             # Page components
│   └── index.html             # HTML template with GTM
├── server/                     # Express.js backend
│   ├── routes.ts              # API endpoints
│   ├── storage.ts             # Database operations
│   └── db.ts                  # Database configuration
├── shared/                     # Shared TypeScript schemas
│   └── schema.ts              # Drizzle schemas and Zod validation
├── public/                     # Static assets
├── docs/                       # Documentation
└── config files               # Various configuration files
```

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Analytics/GTM accounts (for analytics)

### Environment Setup

1. **Clone and install:**
```bash
git clone https://github.com/[username]/nivela-landing-page.git
cd nivela-landing-page
npm install
```

2. **Environment variables:**
```bash
# Copy example environment file
cp .env.example .env

# Configure your variables:
DATABASE_URL=postgresql://...
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. **Database setup:**
```bash
# Push schema to database
npm run db:push

# Optional: Generate migrations
npm run db:generate
```

4. **Development server:**
```bash
npm run dev
# Opens http://localhost:5000
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate database migrations
- `npm run db:studio` - Open Drizzle Studio

### Development Guidelines

#### Code Style
- **TypeScript First:** All code uses TypeScript with strict typing
- **Component Structure:** Functional components with hooks
- **Styling:** Tailwind CSS with custom design tokens
- **State Management:** React Query for server state, React hooks for client state

#### Best Practices
- **Performance:** Lazy loading, code splitting, optimized images
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support
- **SEO:** Meta tags, structured data, semantic HTML
- **Security:** CSP headers, input validation, secure API endpoints

## 🚀 Deployment

### Production Deployment (Vercel)

1. **Connect Repository:**
   - Link GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Environment Variables:**
```bash
DATABASE_URL=postgresql://...
VITE_SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-key
```

3. **Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `client/dist`

4. **Database Migration:**
```bash
npm run db:push
```

### Performance Optimization
- **Bundle Size:** ~207KB gzipped (optimized)
- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** Excellent ratings
- **First Load:** < 1.5s on 3G connections

## 📊 Analytics & Tracking

### Google Tag Manager Setup
- **Container ID:** GTM-KZW3RTWD
- **Events Tracked:**
  - Form submissions (leads, distributors)
  - Video engagement (play, progress, completion)
  - WhatsApp clicks with UTM attribution
  - Performance metrics (LCP, FID, CLS)
  - Error tracking and exceptions

### UTM Campaign Attribution
- **Source Tracking:** Automatic UTM parameter capture
- **Session Persistence:** UTM data persisted across user session
- **Form Integration:** Campaign attribution in all form submissions
- **WhatsApp Integration:** UTM data injected into WhatsApp links

### Performance Monitoring
- **Core Web Vitals:** LCP, FID, CLS tracking
- **Custom Metrics:** Page load times, resource loading
- **Error Tracking:** JavaScript exceptions and API errors
- **Real User Monitoring:** Actual user experience metrics

## 🎨 Design System

### Brand Colors
```css
:root {
  --brand-deep: #2D1B0E;      /* Primary dark brown */
  --brand-caramel: #8B4513;   /* Secondary caramel */
  --brand-latte: #D2B48C;     /* Accent latte */
  --brand-light: #F5F5DC;     /* Background beige */
  --brand-accent: #DAA520;    /* Gold accent */
}
```

### Typography
- **Primary Font:** Montserrat (Google Fonts)
- **Headings:** Font weights 300-700
- **Body Text:** Optimized for readability
- **Mobile First:** Responsive typography scales

### Components
- **UI Library:** shadcn/ui components
- **Custom Components:** Landing page specific elements
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Lazy loaded, optimized rendering

## 📈 Performance Metrics

### Bundle Analysis
- **Total Size:** 207KB gzipped
- **JavaScript:** ~150KB
- **CSS:** ~25KB
- **Assets:** Optimized images and videos

### Lighthouse Scores
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 95+
- **SEO:** 100

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **TypeScript:** Strict mode enabled
- **ESLint:** Extended recommended rules
- **Prettier:** Automatic code formatting
- **Testing:** Component and integration tests

## 📄 License

This project is proprietary and confidential. All rights reserved to Bem Beauty Professional.

## 🔗 Links

- **Production:** [nivela.bembeauty.com.br](https://nivela.bembeauty.com.br)
- **Documentation:** [docs/](./docs/)
- **Bug Reports:** [Issues](https://github.com/[username]/nivela-landing-page/issues)
- **Support:** [Contact](mailto:support@bembeauty.com.br)

---

Built with ❤️ by the Bem Beauty Professional team