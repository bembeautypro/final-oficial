// Analytics Event Tracking for NIVELA® Landing Page
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export function initEventTracking() {
  // Scroll tracking
  let s50 = false, s90 = false;
  window.addEventListener('scroll', () => {
    const s = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    if (!s50 && s >= 50) {
      s50 = true;
      window.dataLayer?.push({ event: 'scroll_50' });
    }
    if (!s90 && s >= 90) {
      s90 = true;
      window.dataLayer?.push({ event: 'scroll_90' });
    }
  });

  // Click tracking for elements with data-gtm-event
  document.addEventListener('click', (e: any) => {
    const el = e.target.closest('[data-gtm-event]');
    if (el) {
      window.dataLayer?.push({ event: el.getAttribute('data-gtm-event') });
    }
  });

  // Form tracking - Professional Lead Form
  const pro = document.querySelector<HTMLFormElement>('[data-form="lead"]');
  if (pro) {
    const once = () => {
      window.dataLayer?.push({ event: 'form_start' });
      pro.removeEventListener('input', once);
    };
    pro.addEventListener('input', once);
    pro.addEventListener('submit', () => {
      window.dataLayer?.push({ event: 'generate_lead' });
      // Meta Pixel Lead event
      if (window.fbq) window.fbq('track', 'Lead');
    });
  }

  // Form tracking - Distributor Form
  const dist = document.querySelector<HTMLFormElement>('[data-form="distribuidor"]');
  if (dist) {
    const onceD = () => {
      window.dataLayer?.push({ event: 'form_start_distribuidor' });
      dist.removeEventListener('input', onceD);
    };
    dist.addEventListener('input', onceD);
    dist.addEventListener('submit', () => {
      window.dataLayer?.push({ event: 'generate_lead_distribuidor' });
      // Meta Pixel Lead event  
      if (window.fbq) window.fbq('track', 'Lead');
    });
  }

  // WhatsApp tracking with UTM injection
  document.querySelectorAll('[data-whatsapp]').forEach((a: Element) => {
    a.addEventListener('click', (ev: any) => {
      const href = (a as HTMLAnchorElement).href;
      if (!href.includes('wa.me')) return;
      
      const utm = sessionStorage.getItem('nivela_utms');
      if (utm) {
        try {
          const u = JSON.parse(utm);
          const tag = `[utm:${u.utm_source || '-'}/${u.utm_medium || '-'}/${u.utm_campaign || '-'}] `;
          const url = new URL(href);
          const txt = url.searchParams.get('text') || '';
          url.searchParams.set('text', (tag + txt).trim());
          (a as HTMLAnchorElement).href = url.toString();
        } catch (e) {
          // UTM injection failed - continue without modification
        }
      }
    });
  });

  // Video tracking - Enhanced with delayed binding for dynamic content
  function bindVideo(id: string, base: string) {
    const v = document.getElementById(id) as HTMLVideoElement | null;
    if (!v) return;
    
    let s10 = false, s90 = false;
    
    v.addEventListener('play', () => window.dataLayer?.push({ event: base + '_start' }));
    
    v.addEventListener('timeupdate', () => {
      if (!v.duration || !isFinite(v.duration)) return;
      const p = v.currentTime / v.duration * 100;
      
      if (!s10 && p >= 10) {
        s10 = true;
        window.dataLayer?.push({ event: base + '_10' });
      }
      if (!s90 && p >= 90) {
        s90 = true;
        window.dataLayer?.push({ event: base + '_complete' });
      }
    });
  }

  // Initial video binding
  bindVideo('video-manifesto', 'video_manifesto');
  bindVideo('video-tecnologia', 'video_tecnologia');
  
  // Setup MutationObserver for dynamically loaded videos
  const videoObserver = new MutationObserver(() => {
    bindVideo('video-manifesto', 'video_manifesto');
    bindVideo('video-tecnologia', 'video_tecnologia');
  });
  
  videoObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Core Web Vitals tracking - REMOVED
  // Using proper implementation in webvitals.ts instead

  // Error tracking
  window.addEventListener('error', (e) => {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: (e.message || 'error'),
        fatal: false
      });
    }
  });

  window.addEventListener('unhandledrejection', (e: any) => {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: (e.reason && (e.reason.message || e.reason)) || 'promise rejection',
        fatal: false
      });
    }
  });
}