export function initWebVitalsToGA4() {
  // @ts-ignore
  const gtag = window.gtag ? window.gtag : null;
  const send = (name: string, value: number, id: string) => { 
    if (!gtag) return; 
    gtag('event', name, { 
      value: Math.round(name==='CLS' ? value*1000 : value), 
      event_id: id, 
      non_interaction: true 
    }); 
  };

  if ('PerformanceObserver' in window) {
    try { // CLS
      let cls = 0;
      // @ts-ignore
      const poCLS = new PerformanceObserver((list)=>{ 
        list.getEntries().forEach((e)=>{ 
          if(!e.hadRecentInput) cls += e.value || 0; 
        }); 
        send('CLS', cls, 'cls-'+Date.now()); 
      });
      // @ts-ignore
      poCLS.observe({ type: 'layout-shift', buffered: true });
    } catch {}

    try { // LCP
      let lcp = 0;
      // @ts-ignore
      const poLCP = new PerformanceObserver((list)=>{ 
        const last = list.getEntries().pop(); 
        if(last?.renderTime) lcp = last.renderTime; 
        else if(last?.loadTime) lcp = last.loadTime; 
        send('LCP', lcp, 'lcp-'+Date.now()); 
      });
      // @ts-ignore
      poLCP.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}

    try { // INP (aprox.)
      let maxDuration = 0;
      // @ts-ignore
      const poINP = new PerformanceObserver((list)=>{ 
        list.getEntries().forEach((e)=>{ 
          const d = e.duration || 0; 
          if (d > maxDuration) maxDuration = d; 
        }); 
        send('INP', maxDuration, 'inp-'+Date.now()); 
      });
      // @ts-ignore
      poINP.observe({ type: 'event', buffered: true });
    } catch {}
  }
}