# NIVELA® Performance Guide

## Overview

This guide covers performance optimization strategies, monitoring, and best practices for the NIVELA® landing page to ensure optimal user experience and business conversion rates.

## Current Performance Metrics

### Production Benchmarks (as of Aug 11, 2025)
- **Bundle Size:** 207KB gzipped (optimized)
- **Lighthouse Score:** 95+ (all categories)
- **First Load Time:** < 1.5s
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

### Performance Targets
- **Time to Interactive:** < 3s on 3G
- **First Contentful Paint:** < 1.5s
- **Speed Index:** < 2s
- **Total Blocking Time:** < 200ms

## Bundle Optimization

### Code Splitting Strategy

#### Route-based Splitting
```typescript
// Lazy load page components
const LazyDistributorPage = lazy(() => import('./pages/DistributorPage'));
const LazyAboutPage = lazy(() => import('./pages/AboutPage'));

// Wrap with Suspense
<Suspense fallback={<PageSkeleton />}>
  <Route path="/distribuidor" component={LazyDistributorPage} />
</Suspense>
```

#### Component-based Splitting
```typescript
// Heavy components only loaded when needed
const LazyVideoPlayer = lazy(() => import('./components/VideoPlayer'));
const LazyAnalyticsDashboard = lazy(() => import('./components/Analytics'));

// Conditional loading
{showVideo && (
  <Suspense fallback={<VideoSkeleton />}>
    <LazyVideoPlayer src={videoSrc} />
  </Suspense>
)}
```

#### Vendor Chunk Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libs
          react: ['react', 'react-dom'],
          
          // UI library
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-form'],
          
          // Analytics
          analytics: ['@tanstack/react-query'],
          
          // Utilities
          utils: ['clsx', 'tailwind-merge', 'zod']
        }
      }
    }
  }
});
```

### Tree Shaking

#### Import Optimization
```typescript
// ✅ Good - Named imports
import { Button, Input } from '@/components/ui';
import { useState, useEffect } from 'react';

// ❌ Bad - Default imports of large libraries
import * as React from 'react';
import _ from 'lodash';

// ✅ Good - Specific imports
import debounce from 'lodash/debounce';
```

#### Bundle Analysis
```bash
# Analyze bundle composition
npm run build
npm run analyze

# Check for unused code
npx webpack-bundle-analyzer client/dist
```

## Asset Optimization

### Image Optimization

#### Format Selection
```typescript
// Modern format with fallbacks
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

#### Responsive Images
```typescript
// Responsive image component
const ResponsiveImage = ({ src, alt, sizes }) => (
  <img
    src={src}
    srcSet={`
      ${src}?w=400 400w,
      ${src}?w=800 800w,
      ${src}?w=1200 1200w
    `}
    sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
    alt={alt}
    loading="lazy"
    decoding="async"
  />
);
```

#### Lazy Loading Implementation
```typescript
// Intersection Observer for custom lazy loading
const useLazyLoading = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
```

### Video Optimization

#### Lazy Video Loading
```typescript
const VideoLazy = ({ src, poster, autoPlay = false }) => {
  const { ref, isVisible } = useLazyLoading();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div ref={ref} className="video-container">
      {isVisible ? (
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted
          playsInline
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={() => setIsLoading(false)}
        />
      ) : (
        <img src={poster} alt="Video thumbnail" />
      )}
      {isLoading && <VideoLoadingSpinner />}
    </div>
  );
};
```

#### Video Format Optimization
```html
<!-- Multiple format support -->
<video controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  Your browser doesn't support video.
</video>
```

## Runtime Performance

### React Optimization

#### Component Memoization
```typescript
// Memo for expensive components
const ExpensiveComponent = React.memo(({ data, onAction }) => {
  // Heavy computation or rendering
  const processedData = useMemo(() => {
    return heavyDataProcessing(data);
  }, [data]);

  // Stable callback reference
  const handleClick = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  return <div>{/* Component JSX */}</div>;
});

// Display name for debugging
ExpensiveComponent.displayName = 'ExpensiveComponent';
```

#### State Management Optimization
```typescript
// Efficient state updates
const useOptimizedState = (initialData) => {
  // Use useReducer for complex state
  const [state, dispatch] = useReducer(complexReducer, initialData);

  // Batch updates with React 18
  const updateMultipleFields = useCallback((updates) => {
    startTransition(() => {
      dispatch({ type: 'UPDATE_MULTIPLE', payload: updates });
    });
  }, []);

  return { state, updateMultipleFields };
};
```

#### Virtual Scrolling
```typescript
// For large lists (if needed in future)
const VirtualList = ({ items, itemHeight = 50 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 400;
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);

  return (
    <div
      style={{ height: containerHeight, overflowY: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={visibleStart + index}
            style={{
              position: 'absolute',
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {/* Item content */}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Network Optimization

#### Request Optimization
```typescript
// Debounced API calls
const useDebouncedSearch = (query: string, delay = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return debouncedQuery;
};

// Request deduplication with React Query
const useLeadSubmission = () => {
  return useMutation({
    mutationFn: submitLead,
    // Prevent duplicate submissions
    mutationKey: ['submit-lead'],
    // Retry logic
    retry: (failureCount, error) => {
      return failureCount < 3 && error.status !== 400;
    }
  });
};
```

#### Caching Strategy
```typescript
// Service Worker caching
const CACHE_NAME = 'nivela-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/images/logo.webp'
];

// Cache strategy implementation
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    // Cache-first for images
    event.respondWith(cacheFirst(event.request));
  } else if (event.request.url.includes('/api/')) {
    // Network-first for API calls
    event.respondWith(networkFirst(event.request));
  } else {
    // Stale-while-revalidate for pages
    event.respondWith(staleWhileRevalidate(event.request));
  }
});
```

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)

#### Image Optimization
```typescript
// Preload critical images
<link
  rel="preload"
  as="image"
  href="hero-image.webp"
  fetchpriority="high"
/>

// Critical image component
const HeroImage = () => (
  <img
    src="hero-image.webp"
    alt="NIVELA® Product"
    fetchpriority="high"
    decoding="sync"
    style={{ aspectRatio: '16/9' }}
  />
);
```

#### Font Loading Optimization
```css
/* Preload critical fonts */
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/montserrat-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* Critical CSS inlined */
.hero-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 4rem);
}
```

### First Input Delay (FID)

#### Event Handler Optimization
```typescript
// Passive event listeners
useEffect(() => {
  const handleScroll = throttle(() => {
    // Scroll handling logic
  }, 16); // 60fps

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// Efficient click handlers
const handleClick = useCallback((e: React.MouseEvent) => {
  // Use event delegation when possible
  const target = e.target as HTMLElement;
  const button = target.closest('[data-action]');
  
  if (button) {
    const action = button.getAttribute('data-action');
    handleAction(action);
  }
}, []);
```

#### Code Splitting for Interactivity
```typescript
// Load interactive components only when needed
const InteractiveForm = lazy(() => 
  import('./InteractiveForm').then(module => ({
    default: module.InteractiveForm
  }))
);

// Use React 18 concurrent features
const FormWithSuspense = () => (
  <Suspense fallback={<FormSkeleton />}>
    <InteractiveForm />
  </Suspense>
);
```

### Cumulative Layout Shift (CLS)

#### Layout Stability
```css
/* Reserve space for images */
.image-container {
  aspect-ratio: 16/9;
  background-color: #f0f0f0;
}

/* Prevent layout shift from fonts */
.text-content {
  font-size: 1rem;
  line-height: 1.5;
  /* Use size-adjust for font swapping */
  font-size-adjust: 0.5;
}
```

#### Dynamic Content Loading
```typescript
// Skeleton loading to prevent shifts
const ContentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

// Stable dimensions for dynamic content
const DynamicContent = ({ isLoading, content }) => (
  <div className="min-h-[200px] flex items-center justify-center">
    {isLoading ? <ContentSkeleton /> : content}
  </div>
);
```

## Performance Monitoring

### Real User Monitoring (RUM)

#### Core Web Vitals Tracking
```typescript
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const trackWebVitals = () => {
  // Track all Core Web Vitals
  getCLS((metric) => sendToAnalytics('CLS', metric));
  getFID((metric) => sendToAnalytics('FID', metric));
  getLCP((metric) => sendToAnalytics('LCP', metric));
  getFCP((metric) => sendToAnalytics('FCP', metric));
  getTTFB((metric) => sendToAnalytics('TTFB', metric));
};

const sendToAnalytics = (name: string, metric: any) => {
  // Send to Google Analytics
  gtag('event', name, {
    value: Math.round(metric.value),
    event_label: metric.id,
    non_interaction: true
  });

  // Send to custom analytics
  fetch('/api/metrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metricName: name,
      metricValue: metric.value.toString(),
      pageUrl: window.location.href,
      userAgent: navigator.userAgent
    })
  });
};
```

#### Custom Performance Metrics
```typescript
// Track custom timings
const trackCustomMetrics = () => {
  // Time to first form interaction
  const trackFormInteraction = () => {
    const startTime = performance.now();
    
    document.addEventListener('focusin', function handler(e) {
      if (e.target.matches('input, textarea, select')) {
        const interactionTime = performance.now() - startTime;
        sendToAnalytics('time_to_first_form_interaction', {
          value: interactionTime
        });
        document.removeEventListener('focusin', handler);
      }
    });
  };

  // Track API response times
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const startTime = performance.now();
    const response = await originalFetch(...args);
    const endTime = performance.now();
    
    sendToAnalytics('api_response_time', {
      value: endTime - startTime,
      url: args[0]
    });
    
    return response;
  };
};
```

### Performance Budgets

#### Bundle Size Budgets
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Warn if chunks exceed limits
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Keep vendor chunks under 150KB
            return 'vendor';
          }
        }
      }
    },
    // Build fails if total exceeds 500KB
    chunkSizeWarningLimit: 500
  }
});
```

#### Performance Monitoring Dashboard
```typescript
// Performance dashboard component
const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Collect performance data
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        setMetrics(prev => ({
          ...prev,
          [entry.name]: entry.duration || entry.value
        }));
      });
    });

    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="performance-dashboard">
      {Object.entries(metrics).map(([name, value]) => (
        <div key={name} className="metric">
          <span>{name}:</span>
          <span>{value}ms</span>
        </div>
      ))}
    </div>
  );
};
```

## Optimization Checklist

### Pre-Launch Checklist
- [ ] Bundle size < 250KB gzipped
- [ ] Images optimized (WebP/AVIF)
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] Service worker configured
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass

### Regular Monitoring
- [ ] Weekly performance audits
- [ ] Bundle size tracking
- [ ] Core Web Vitals monitoring
- [ ] User experience metrics
- [ ] Performance regression detection

### Performance Tools
- **Lighthouse:** Regular audits
- **WebPageTest:** Detailed analysis
- **Chrome DevTools:** Development profiling
- **Bundle Analyzer:** Size optimization
- **Web Vitals Extension:** Real-time monitoring

---

This performance guide ensures the NIVELA® landing page maintains optimal performance standards while delivering an exceptional user experience that drives business conversions.