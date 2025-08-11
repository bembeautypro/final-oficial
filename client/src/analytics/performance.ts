interface CoreWebVitals {
  CLS: number;
  FID: number;
  LCP: number;
  FCP: number;
  TTFB: number;
}

interface PageLoadMetrics {
  page_load_time: number;
  dom_interactive: number;
  dom_complete: number;
  first_paint: number;
  first_contentful_paint: number;
}

let webVitalsReported = false;

export function reportWebVitals() {
  if (webVitalsReported || typeof window === 'undefined') return;
  
  // Use Web Vitals API if available
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
  
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'web_vitals',
            metric_name: 'LCP',
            metric_value: entry.startTime,
            metric_id: 'lcp'
          });
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        const fidValue = fidEntry.processingStart - fidEntry.startTime;

        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'web_vitals',
            metric_name: 'FID',
            metric_value: fidValue,
            metric_id: 'fid'
          });
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'web_vitals',
          metric_name: 'CLS',
          metric_value: clsValue,
          metric_id: 'cls'
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  webVitalsReported = true;
}

export function reportPageLoadMetrics() {
  if (typeof window === 'undefined' || !window.performance) return;

  // Wait for page to fully load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const timing = window.performance.timing;
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics: PageLoadMetrics = {
        page_load_time: timing.loadEventEnd - timing.navigationStart,
        dom_interactive: timing.domInteractive - timing.navigationStart,
        dom_complete: timing.domComplete - timing.navigationStart,
        first_paint: navigation?.fetchStart || 0,
        first_contentful_paint: navigation?.loadEventEnd || 0
      };


      
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'page_performance',
          ...metrics
        });
      }
    }, 1000);
  });
}

export function initPerformanceTracking() {
  if (typeof window === 'undefined') return;
  
  reportWebVitals();
  reportPageLoadMetrics();
}