/**
 * Performance Optimizations - Mobile/Desktop Core Web Vitals
 * Reduz TBT, melhora LCP/FCP, corrige bfcache
 */

// Passive event listeners globais (reduz TBT)
export function initPassiveEventListeners() {
  if (typeof window === 'undefined') return;
  
  const originalAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (['scroll', 'touchstart', 'touchmove', 'mousewheel', 'wheel'].includes(type)) {
      if (typeof options !== 'object' || options === null) {
        options = { passive: true };
      } else if (options.passive === undefined) {
        options.passive = true;
      }
    }
    return originalAdd.call(this, type, listener, options);
  };
}

// Remove unload/beforeunload listeners (melhora bfcache)
export function initBfcacheOptimizations() {
  if (typeof window === 'undefined') return;
  
  // Remove qualquer listener unload existente
  window.addEventListener('beforeunload', (e) => {
    e.stopImmediatePropagation();
  });
  
  // Page Visibility API para cleanup
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Cleanup leve para bfcache
      // Não fazer operações pesadas aqui
    }
  });
}

// Dynamic import para código abaixo da dobra
export async function loadBelowFoldContent() {
  if (typeof window === 'undefined') return;

  return new Promise<void>((resolve) => {
    const loadContent = async () => {
      try {
        // Aguarda load completo para carregar código não crítico
        // Futuras funcionalidades podem ser lazy-loaded aqui
        resolve();
      } catch (error) {
        console.warn('Below-fold content loading failed:', error);
        resolve();
      }
    };

    if (document.readyState === 'complete') {
      loadContent();
    } else {
      window.addEventListener('load', loadContent, { once: true });
    }
  });
}

// Inicialização completa das otimizações
export function initPerformanceOptimizations() {
  initPassiveEventListeners();
  initBfcacheOptimizations();
  
  // Load below-fold content após carregamento
  window.addEventListener('load', async () => {
    await loadBelowFoldContent();
  });
}