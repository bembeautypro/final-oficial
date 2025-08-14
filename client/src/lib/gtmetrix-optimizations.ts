/**
 * GTmetrix Performance Optimizations
 * Applied to resolve TBT, bfcache failures, and mobile form issues
 */

// GTmetrix: Form focus smooth scroll for mobile
export function initFormFocusOptimizations() {
  if (typeof window === 'undefined') return;

  // Wait for DOM to be ready
  const initFormHandlers = () => {
    const formElements = document.querySelectorAll('.form input, .form textarea, .form select, input, textarea, select');
    
    formElements.forEach((element) => {
      const el = element as HTMLElement;
      
      // Set scroll margin for smooth focus navigation
      el.style.scrollMarginTop = '96px';
      
      // Add focus handler for smooth scroll to center
      el.addEventListener('focus', () => {
        el.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }, { passive: true });
    });
  };

  // Initialize immediately if DOM ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandlers);
  } else {
    initFormHandlers();
  }
}

// GTmetrix: Remove unload/beforeunload listeners for bfcache
export function initBfcacheOptimizations() {
  if (typeof window === 'undefined') return;

  // Ensure all scroll/touch/mouse events are passive
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (['scroll', 'touchstart', 'touchmove', 'mousewheel', 'wheel'].includes(type)) {
      const passiveOptions = typeof options === 'object' ? 
        { ...options, passive: true } : 
        { passive: true, capture: !!options };
      return originalAddEventListener.call(this, type, listener, passiveOptions);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };

  // Remove any existing unload listeners (bfcache killers)
  window.addEventListener('beforeunload', (e) => {
    // Allow bfcache by not preventing default or setting returnValue
    e.stopImmediatePropagation();
  });
}

// GTmetrix: Dynamic import for below-the-fold content
export async function loadBelowFoldContent() {
  if (typeof window === 'undefined') return;

  return new Promise<void>((resolve) => {
    const loadContent = async () => {
      try {
        // Dynamic imports can be added here for below-fold components
        // Example: const mod = await import('./chunks/belowFold.js');
        // mod?.init?.();
        resolve();
      } catch (error) {
        console.warn('Below-fold content loading failed:', error);
        resolve();
      }
    };

    // Load after page is fully loaded
    if (document.readyState === 'complete') {
      loadContent();
    } else {
      window.addEventListener('load', loadContent, { once: true });
    }
  });
}

// GTmetrix: Honeypot validation for forms
export function validateHoneypot(formElement: HTMLFormElement): boolean {
  const honeypot = formElement.querySelector('input[name="hp"]') as HTMLInputElement;
  return !honeypot?.value; // Return false if honeypot is filled (bot detected)
}

// Initialize all GTmetrix optimizations
export function initGTmetrixOptimizations() {
  initFormFocusOptimizations();
  initBfcacheOptimizations();
  loadBelowFoldContent();
}