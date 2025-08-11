// src/analytics/webvitals.ts
export function initWebVitalsToGA4() {
  // helper
  // @ts-ignore
  const gtag = window.gtag ? window.gtag : null;
  const send = (name: 'CLS'|'LCP'|'INP', value: number, id: string) => {
    if (!gtag) return;
    gtag('event', name, {
      value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS em ‰ para GA4
      event_id: id,
      non_interaction: true
    });
  };

  // CLS: soma dos layout-shift sem interação recente
  if ('PerformanceObserver' in window) {
    try {
      let cls = 0;
      // @ts-ignore
      const poCLS = new PerformanceObserver((list) => {
        list.getEntries().forEach((e: any) => {
          if (!e.hadRecentInput) cls += e.value || 0;
        });
        send('CLS', cls, 'cls-' + String(Date.now()));
      });
      // @ts-ignore
      poCLS.observe({ type: 'layout-shift', buffered: true });
    } catch {}
    try {
      // LCP: maior 'largest-contentful-paint'
      let lcp = 0;
      // @ts-ignore
      const poLCP = new PerformanceObserver((list) => {
        const last = list.getEntries().pop() as any;
        if (last && last.renderTime) lcp = last.renderTime;
        else if (last && last.loadTime) lcp = last.loadTime;
        // envia no primeiro callback (buffered já pega o último)
        send('LCP', lcp, 'lcp-' + String(Date.now()));
      });
      // @ts-ignore
      poLCP.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
    try {
      // INP (aproximação): maior duração de 'event' (Event Timing)
      let maxDuration = 0;
      // @ts-ignore
      const poINP = new PerformanceObserver((list) => {
        list.getEntries().forEach((e: any) => {
          // algumas entradas vêm como 'interaction' em navegadores modernos
          const d = e.duration || 0;
          if (d > maxDuration) maxDuration = d;
        });
        // envia uma estimativa (buffered pega histórico)
        send('INP', maxDuration, 'inp-' + String(Date.now()));
      });
      // @ts-ignore
      poINP.observe({ type: 'event', buffered: true });
    } catch {}
  }
}