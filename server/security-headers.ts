import { Request, Response, NextFunction } from 'express';

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Content Security Policy - Allow necessary resources for production
  res.setHeader('Content-Security-Policy',
    "default-src 'self' https://*.supabase.co https://www.googletagmanager.com https://www.google-analytics.com; " +
    "img-src 'self' data: https://*.supabase.co; " +
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "font-src 'self' data:; " +
    "frame-ancestors 'self' https://*.replit.dev https://*.replit.com;"
  );

  // Security headers for production
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
}

export function redirectWww(req: Request, res: Response, next: NextFunction) {
  // Redirect www to root domain for SEO consistency
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const protocol = req.secure ? 'https' : 'http';
    const redirectUrl = `${protocol}://${req.headers.host.replace(/^www\./, '')}${req.url}`;
    return res.redirect(301, redirectUrl);
  }
  next();
}