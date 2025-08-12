import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Performance optimization: start render immediately
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Clear skeleton and render React app
rootElement.innerHTML = '';
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register advanced service worker for maximum performance
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw-advanced.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('Advanced SW registered:', registration.scope);
      
      // Prefetch critical routes
      if (registration.active) {
        registration.active.postMessage({
          type: 'PREFETCH_ROUTES',
          routes: ['/src/components/landing/CompleteTechnologySection.tsx']
        });
      }
    } catch (error) {
      console.warn('SW registration failed:', error);
    }
  });
}
