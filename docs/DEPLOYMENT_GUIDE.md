# NIVELA® Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the NIVELA® landing page to various environments, with detailed configurations for production deployment on Vercel and database hosting on Supabase.

## Prerequisites

### Required Accounts
- **Vercel Account** - For frontend hosting and deployment
- **Supabase Account** - For PostgreSQL database and storage
- **Google Analytics** - For GA4 tracking (optional but recommended)
- **Google Tag Manager** - For event tracking (optional but recommended)
- **GitHub Account** - For version control and CI/CD

### Required Tools
- Node.js 18+ 
- npm or yarn package manager
- Git version control
- Code editor (VS Code recommended)

## Environment Setup

### 1. Repository Setup

#### Clone the Repository
```bash
git clone https://github.com/[username]/nivela-landing-page.git
cd nivela-landing-page
```

#### Install Dependencies
```bash
npm install
```

#### Verify Installation
```bash
npm run dev
# Should start development server on http://localhost:5000
```

### 2. Database Setup (Supabase)

#### Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose organization and configure:
   - **Project Name:** `nivela-production` (or your preferred name)
   - **Database Password:** Strong password (save securely)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Pro recommended for production

#### Configure Database
1. After project creation, go to **Settings > Database**
2. Copy the connection string:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[project-ref].supabase.co:5432/postgres
   ```
3. Note your project URL and anon key from **Settings > API**

#### Setup Database Schema
```bash
# Set environment variable
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[project-ref].supabase.co:5432/postgres"

# Push schema to database
npm run db:push
```

#### Verify Database Setup
```bash
# Check tables were created
npm run db:studio
# Opens Drizzle Studio to view database
```

### 3. Environment Configuration

#### Development Environment
Create `.env` file in project root:
```env
# Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[project-ref].supabase.co:5432/postgres

# Supabase
VITE_SUPABASE_URL=https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]

# Optional: Analytics
GTM_CONTAINER_ID=GTM-KZW3RTWD
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Production Environment Variables
For production deployment, you'll need:
```env
# Database (Production)
DATABASE_URL=postgresql://postgres:[PROD-PASSWORD]@db.[prod-project-ref].supabase.co:5432/postgres

# Supabase (Production)
VITE_SUPABASE_URL=https://[prod-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[prod-anon-key]

# Analytics (Production)
GTM_CONTAINER_ID=GTM-KZW3RTWD
GA4_MEASUREMENT_ID=G-[YOUR-PROD-ID]

# Optional: Additional tracking
VERCEL_URL=[auto-generated]
NEXT_PUBLIC_VERCEL_URL=[auto-generated]
```

## Vercel Deployment

### 1. Connect Repository to Vercel

#### Option A: Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `client/dist`
   - **Install Command:** `npm install`

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts to configure project
```

### 2. Configure Environment Variables

#### Via Vercel Dashboard
1. Go to Project Settings > Environment Variables
2. Add the following variables:

**Production Variables:**
```
DATABASE_URL = postgresql://postgres:[PASSWORD]@db.[ref].supabase.co:5432/postgres
VITE_SUPABASE_URL = https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY = [your-anon-key]
```

#### Via Vercel CLI
```bash
# Set environment variables
vercel env add DATABASE_URL
vercel env add VITE_SUPABASE_URL  
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy with environment variables
vercel --prod
```

### 3. Configure Build Settings

#### vercel.json Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Build Command Configuration
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && vite build",
    "build:server": "cd server && tsc",
    "start": "node server/dist/index.js"
  }
}
```

### 4. Custom Domain Setup (Optional)

#### Configure Custom Domain
1. In Vercel Dashboard, go to Project Settings > Domains
2. Add your custom domain: `nivela.bembeauty.com.br`
3. Configure DNS records at your domain provider:
   ```
   Type: CNAME
   Name: nivela (or @)
   Value: [your-vercel-domain].vercel.app
   ```

#### SSL Certificate
Vercel automatically provides SSL certificates for custom domains.

## Database Migration

### Production Database Setup

#### Create Production Database
1. Create separate Supabase project for production
2. Use same schema setup as development
3. Configure production environment variables

#### Run Migrations
```bash
# Set production DATABASE_URL
export DATABASE_URL="[production-connection-string]"

# Apply schema changes
npm run db:push

# Verify migration
npm run db:studio
```

#### Backup Strategy
```bash
# Create database backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup (if needed)
psql $DATABASE_URL < backup_20250811_162200.sql
```

## Analytics Setup

### Google Tag Manager Configuration

#### Container Setup
1. Create GTM container with ID: `GTM-KZW3RTWD`
2. Add container snippet to `client/index.html`
3. Configure triggers and tags for:
   - Page views
   - Form submissions
   - Video engagement
   - Button clicks
   - Error tracking

#### GA4 Integration
1. Create GA4 property
2. Link to GTM container
3. Configure enhanced ecommerce events
4. Set up conversion goals

### Event Tracking Verification
```bash
# Test analytics in development
npm run dev

# Check dataLayer events in browser console
console.log(window.dataLayer);

# Verify GTM container loading
console.log(window.google_tag_manager);
```

## Performance Optimization

### Build Optimization

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze

# Check bundle sizes
du -sh client/dist/*
```

#### Performance Monitoring
```javascript
// Monitor Core Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### CDN Configuration

#### Static Asset Optimization
- Images: WebP format, lazy loading
- Videos: Optimized encoding, lazy loading
- Fonts: Preload critical fonts
- CSS: Critical CSS inlined

#### Caching Headers
```javascript
// Vercel caching configuration
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Security Configuration

### Content Security Policy

#### CSP Headers
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com;
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               img-src 'self' data: *.supabase.co *.google-analytics.com;
               connect-src 'self' *.supabase.co *.google-analytics.com;">
```

#### Environment Variable Security
```bash
# Use Vercel's secure environment variables
vercel env add SECRET_KEY production

# Never commit sensitive data to git
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

## Monitoring and Logging

### Error Tracking

#### Application Monitoring
```javascript
// Error boundary for React components
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to analytics
    gtag('event', 'exception', {
      description: error.toString(),
      fatal: false
    });
  }
}
```

#### API Monitoring
```javascript
// Express error handling
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  
  // Track in analytics
  trackEvent('api_error', {
    endpoint: req.path,
    method: req.method,
    error: error.message
  });
  
  res.status(500).json({ error: 'Internal server error' });
});
```

### Performance Monitoring
```javascript
// Real User Monitoring
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // Send to analytics
    gtag('event', 'web_vitals', {
      metric_name: entry.entryType,
      metric_value: entry.value || entry.startTime,
      non_interaction: true
    });
  });
});

observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
```

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+

# Rebuild with verbose logging
npm run build --verbose
```

#### Database Connection Issues
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT version();"

# Check environment variables
echo $DATABASE_URL
echo $VITE_SUPABASE_URL
```

#### Environment Variable Issues
```bash
# Verify Vercel environment variables
vercel env ls

# Check build logs
vercel logs [deployment-url]
```

### Performance Issues

#### Slow Load Times
1. Check bundle size: `npm run analyze`
2. Verify image optimization
3. Review third-party scripts
4. Check CDN configuration

#### High Server Response Time
1. Optimize database queries
2. Add connection pooling
3. Implement caching
4. Monitor Supabase performance

## Maintenance

### Regular Updates

#### Dependency Updates
```bash
# Check for updates
npm audit
npm outdated

# Update dependencies
npm update

# Security updates
npm audit fix
```

#### Database Maintenance
```bash
# Regular backups
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Monitor performance
# Check Supabase dashboard for slow queries
```

### Monitoring Checklist

#### Daily Checks
- [ ] Site accessibility
- [ ] Form submissions working
- [ ] Analytics data flowing
- [ ] Error rates normal

#### Weekly Checks
- [ ] Performance metrics
- [ ] Database performance
- [ ] Security updates
- [ ] Backup verification

#### Monthly Checks
- [ ] Dependency updates
- [ ] Analytics review
- [ ] Performance optimization
- [ ] Security audit

## Rollback Procedures

### Quick Rollback
```bash
# Rollback to previous Vercel deployment
vercel rollback

# Or specify deployment
vercel rollback [deployment-url]
```

### Database Rollback
```bash
# Restore from backup
psql $DATABASE_URL < backup_[timestamp].sql

# Verify data integrity
npm run db:studio
```

### Emergency Procedures
1. **Site Down:** Check Vercel status, rollback if needed
2. **Database Issues:** Switch to backup database
3. **Security Breach:** Rotate API keys, review logs
4. **Performance Issues:** Enable maintenance mode

---

This deployment guide ensures a reliable, secure, and performant production deployment of the NIVELA® landing page with proper monitoring and maintenance procedures.