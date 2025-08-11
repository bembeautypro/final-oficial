import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { persistUTM } from './lib/utm';
import { initEventTracking } from './analytics/events';
import { initPerformanceTracking } from './analytics/performance';

// Initialize UTM tracking and analytics
persistUTM();

// Initialize event tracking and performance monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initEventTracking();
    initPerformanceTracking();
    import('./analytics/webvitals').then(({ initWebVitalsToGA4 }) => initWebVitalsToGA4());
  });
} else {
  initEventTracking();
  initPerformanceTracking();
  import('./analytics/webvitals').then(({ initWebVitalsToGA4 }) => initWebVitalsToGA4());
}

// Register service worker for caching and performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const existingRegistrations = await navigator.serviceWorker.getRegistrations();
      const hasActiveRegistration = existingRegistrations.some(reg => 
        reg.active && reg.scope === window.location.origin + '/'
      );
      
      if (hasActiveRegistration || navigator.serviceWorker.controller) {
        return;
      }
      
      // Register service worker (will be created for production deployment)
      await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
    } catch (error) {
      // Service worker registration failed - not critical for site function
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
