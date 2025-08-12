import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import securityHeaders from "./security-headers";
import path from "path";

const app = express();

// Security headers
app.use(securityHeaders);

// WWW redirect middleware
app.use((req,res,next)=>{
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    return res.redirect(301, `https://${req.headers.host.replace(/^www\./,'')}${req.url}`);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Fix MIME type issues for JavaScript files
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  } else if (req.path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
  } else if (req.path.endsWith('.ts') || req.path.endsWith('.tsx')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Add explicit routes for SEO files before catch-all
app.get("/robots.txt", (_req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://nivela.bembeauty.com.br/sitemap.xml
`);
});

app.get("/sitemap.xml", (_req, res) => {
  res.set("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nivela.bembeauty.com.br/</loc><priority>1.0</priority></url>
</urlset>`);
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const error = err as any;
    const status = error.status || error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
