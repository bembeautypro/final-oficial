var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/db.ts
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  analyticsEvents: () => analyticsEvents,
  distribuidores: () => distribuidores,
  insertAnalyticsEventSchema: () => insertAnalyticsEventSchema,
  insertDistribuidorSchema: () => insertDistribuidorSchema,
  insertLeadNivelaSchema: () => insertLeadNivelaSchema,
  insertPerformanceMetricSchema: () => insertPerformanceMetricSchema,
  leadsNivela: () => leadsNivela,
  performanceMetrics: () => performanceMetrics
});
import { pgTable, text, uuid, timestamp, inet, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var leadsNivela = pgTable("leads_nivela", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  telefone: text("telefone").notNull(),
  tipoEstabelecimento: text("tipo_estabelecimento").notNull(),
  // Analytics tracking fields
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  userAgent: text("user_agent"),
  ipAddress: inet("ip_address"),
  // Control fields
  status: text("status").notNull().default("pendente"),
  origem: text("origem").default("landing_page"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var performanceMetrics = pgTable("performance_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  metricName: text("metric_name").notNull(),
  metricValue: text("metric_value").notNull(),
  userAgent: text("user_agent"),
  pageUrl: text("page_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});
var analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventName: text("event_name").notNull(),
  eventData: jsonb("event_data"),
  userId: uuid("user_id"),
  sessionId: text("session_id"),
  pageUrl: text("page_url"),
  userAgent: text("user_agent"),
  ipAddress: inet("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});
var distribuidores = pgTable("distribuidores", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone"),
  empresa: text("empresa").notNull(),
  cargo: text("cargo"),
  mensagem: text("mensagem"),
  cidade: text("cidade"),
  estado: text("estado"),
  experienciaDistribuicao: text("experiencia_distribuicao"),
  volumeVendasMensal: text("volume_vendas_mensal"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var insertLeadNivelaSchema = createInsertSchema(leadsNivela).pick({
  nome: true,
  email: true,
  telefone: true,
  tipoEstabelecimento: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true
});
var insertDistribuidorSchema = createInsertSchema(distribuidores).pick({
  nome: true,
  email: true,
  telefone: true,
  empresa: true,
  cargo: true,
  mensagem: true,
  cidade: true,
  estado: true,
  experienciaDistribuicao: true,
  volumeVendasMensal: true
});
var insertPerformanceMetricSchema = createInsertSchema(performanceMetrics).pick({
  metricName: true,
  metricValue: true,
  userAgent: true,
  pageUrl: true
});
var insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  eventName: true,
  eventData: true,
  userId: true,
  sessionId: true,
  pageUrl: true,
  userAgent: true
});

// server/db.ts
var supabaseApiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
var supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseApiUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials:", {
    hasUrl: !!supabaseApiUrl,
    hasKey: !!supabaseServiceKey
  });
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
}
var supabase = createClient(supabaseApiUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
var supabaseDatabaseUrl = "postgresql://postgres.fdyzlqovxvdpkzlwuhjj:Ninaflor1403@@aws-1-sa-east-1.pooler.supabase.com:6543/postgres";
console.log("Connecting to Supabase pooler");
var client = postgres(supabaseDatabaseUrl, {
  ssl: { rejectUnauthorized: false },
  max: 10,
  idle_timeout: 30,
  connect_timeout: 10,
  prepare: false
});
var db = drizzle(client, { schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async createLeadNivela(leadData) {
    try {
      console.log("Inserting lead via Supabase:", leadData);
      const { data, error } = await supabase.from("leads_nivela").insert({
        nome: leadData.nome,
        email: leadData.email,
        telefone: leadData.telefone
      }).select().single();
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      console.log("Lead created via Supabase:", data.id);
      return data;
    } catch (error) {
      console.error("Database error creating lead:", error);
      throw error;
    }
  }
  async getLeadsByEmail(email) {
    return await db.select().from(leadsNivela).where(eq(leadsNivela.email, email));
  }
  async createDistribuidor(distribuidorData) {
    try {
      console.log("Inserting distribuidor via Supabase:", distribuidorData);
      const { data, error } = await supabase.from("distribuidores").insert({
        nome: distribuidorData.nome,
        email: distribuidorData.email,
        telefone: distribuidorData.telefone,
        empresa: distribuidorData.empresa,
        mensagem: distribuidorData.mensagem,
        cidade: distribuidorData.cidade,
        estado: distribuidorData.estado,
        experiencia_distribuicao: distribuidorData.experienciaDistribuicao
      }).select().single();
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      console.log("Distribuidor created via Supabase:", data.id);
      return data;
    } catch (error) {
      console.error("Database error creating distribuidor:", error);
      throw error;
    }
  }
  async getDistribuidores() {
    return await db.select().from(distribuidores);
  }
  async createPerformanceMetric(metricData) {
    try {
      console.log("Inserting performance metric via Supabase:", metricData);
      const { data, error } = await supabase.from("performance_metrics").insert({
        metric_name: metricData.metricName,
        metric_value: metricData.metricValue,
        user_agent: metricData.userAgent,
        page_url: metricData.pageUrl
      }).select().single();
      if (error) {
        console.error("Supabase error creating metric:", error);
        throw error;
      }
      console.log("Performance metric created via Supabase:", data.id);
      return data;
    } catch (error) {
      console.error("Database error creating performance metric:", error);
      throw error;
    }
  }
  async createAnalyticsEvent(eventData) {
    try {
      console.log("Inserting analytics event via Supabase:", eventData);
      const { data, error } = await supabase.from("analytics_events").insert({
        event_name: eventData.eventName,
        session_id: eventData.sessionId,
        page_url: eventData.pageUrl,
        user_agent: eventData.userAgent
      }).select().single();
      if (error) {
        console.error("Supabase error creating analytics event:", error);
        throw error;
      }
      console.log("Analytics event created via Supabase:", data.id);
      return data;
    } catch (error) {
      console.error("Database error creating analytics event:", error);
      throw error;
    }
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadNivelaSchema.parse(req.body);
      const userAgent = req.get("User-Agent");
      const ipAddress = req.ip || req.connection.remoteAddress;
      const lead = await storage.createLeadNivela({
        ...leadData,
        userAgent,
        ipAddress
      });
      res.status(201).json({ success: true, lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  app2.post("/api/distribuidores", async (req, res) => {
    try {
      const distribuidorData = insertDistribuidorSchema.parse(req.body);
      const distribuidor = await storage.createDistribuidor(distribuidorData);
      res.status(201).json({ success: true, distribuidor });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating distribuidor:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  app2.post("/api/metrics", async (req, res) => {
    try {
      const metricData = insertPerformanceMetricSchema.parse(req.body);
      const metric = await storage.createPerformanceMetric(metricData);
      res.status(201).json({ success: true, metric });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating metric:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  app2.post("/api/analytics", async (req, res) => {
    try {
      const eventData = insertAnalyticsEventSchema.parse(req.body);
      const userAgent = req.get("User-Agent");
      const ipAddress = req.ip || req.connection.remoteAddress;
      const event = await storage.createAnalyticsEvent({
        ...eventData,
        userAgent,
        ipAddress
      });
      res.status(201).json({ success: true, event });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating analytics event:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  app2.post("/api/analytics/batch", async (req, res) => {
    try {
      const { events, sessionId, timestamp: timestamp2 } = req.body;
      const userAgent = req.get("User-Agent");
      const ipAddress = req.ip || req.connection.remoteAddress;
      if (!events || !Array.isArray(events)) {
        return res.status(400).json({ error: "Events array is required" });
      }
      const results = [];
      for (const event of events) {
        try {
          const analyticsEvent = await storage.createAnalyticsEvent({
            eventName: event.name || event.eventName,
            eventData: event.data || event.eventData || {},
            sessionId,
            pageUrl: event.url || event.pageUrl,
            userAgent,
            ipAddress
          });
          results.push(analyticsEvent);
        } catch (err) {
          console.error("Error creating individual analytics event:", err);
        }
      }
      res.status(201).json({ success: true, processed: results.length, total: events.length });
    } catch (error) {
      console.error("Error processing analytics batch:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
