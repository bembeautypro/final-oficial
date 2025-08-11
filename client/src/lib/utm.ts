// UTM Management for NIVELA® Landing Page
export function getUTMFromURL() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    utm_content: p.get('utm_content'),
    utm_term: p.get('utm_term')
  };
}

export function persistUTM() {
  const u = getUTMFromURL();
  const hasAny = Object.values(u).some(Boolean);
  if (hasAny) {
    sessionStorage.setItem('nivela_utms', JSON.stringify(u));
  }
}

export function readUTM() {
  try {
    return JSON.parse(sessionStorage.getItem('nivela_utms') || '{}');
  } catch {
    return {};
  }
}