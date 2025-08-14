// Below-fold content lazy loader para reduzir bundle inicial
export const loadBelowFoldContent = async () => {
  // Carregar componentes pesados apenas após load da página
  if (typeof window !== 'undefined' && window.requestIdleCallback) {
    window.requestIdleCallback(async () => {
      try {
        // Pre-carrega seções que não estão na dobra inicial
        const modules = await Promise.all([
          import('../components/landing/FAQSection'),
          import('../components/landing/DistributorSection'),
          import('../components/landing/PreFooter')
        ]);
        
        // Inicializa funcionalidades não críticas
        initBelowFoldFeatures();
      } catch (error) {
        console.warn('Below-fold content loading failed:', error);
      }
    });
  } else {
    // Fallback para browsers sem requestIdleCallback
    setTimeout(loadBelowFoldContent, 3000);
  }
};

const initBelowFoldFeatures = () => {
  // Inicializar funcionalidades que não impactam LCP/FCP
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  
  // Observer para lazy loading de imagens below-fold
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
};

export default loadBelowFoldContent;