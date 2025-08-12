import { Request, Response, NextFunction } from "express";

function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Content-Security-Policy',
    "default-src 'self' https://*.supabase.co https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com; " +
    "img-src 'self' data: https://*.supabase.co; " +
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://unpkg.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com; " +
    "frame-ancestors 'self' *.replit.dev *.replit.com;");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // X-Frame-Options removed to allow Replit preview iframe
  next();
}

export default securityHeaders;