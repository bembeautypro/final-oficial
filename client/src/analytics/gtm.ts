interface GTMPageViewData {
  event: 'page_view';
  page_title: string;
  page_location: string;
  page_referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

interface GTMEventData {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function pushToDataLayer(data: GTMPageViewData | GTMEventData) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
}

export function trackPageView(page_title: string, page_location: string, utmParams?: {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}) {
  const data: GTMPageViewData = {
    event: 'page_view',
    page_title,
    page_location,
    page_referrer: document.referrer,
    ...utmParams
  };
  
  pushToDataLayer(data);
}

export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  const data: GTMEventData = {
    event: eventName,
    ...parameters
  };
  
  pushToDataLayer(data);
}

export function trackFormSubmission(formName: string, formType: string) {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_action: 'form_submit',
    event_label: formName,
    form_type: formType
  });
}

export function trackLeadGeneration(leadType: string) {
  trackEvent('generate_lead', {
    event_category: 'conversion',
    event_action: 'generate_lead',
    event_label: leadType,
    currency: 'BRL',
    value: leadType === 'distribuidor' ? 500 : 100
  });
}

export function trackWhatsAppClick(source: string) {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_action: 'whatsapp_click',
    event_label: source
  });
}

export function trackVideoEngagement(videoId: string, action: 'play' | 'pause' | 'complete', progress?: number) {
  trackEvent('video_engagement', {
    event_category: 'engagement',
    event_action: `video_${action}`,
    event_label: videoId,
    video_progress: progress
  });
}

export function trackCTAClick(ctaName: string, destination: string) {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_action: 'cta_click',
    event_label: ctaName,
    destination
  });
}