import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadNivelaSchema, 
  insertDistribuidorSchema, 
  insertPerformanceMetricSchema,
  insertAnalyticsEventSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead NIVELA form submission
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadNivelaSchema.parse(req.body);
      const userAgent = req.get('User-Agent');
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
        // Error logged for development only
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Distribuidor form submission
  app.post("/api/distribuidores", async (req, res) => {
    try {
      const distribuidorData = insertDistribuidorSchema.parse(req.body);
      const distribuidor = await storage.createDistribuidor(distribuidorData);
      
      res.status(201).json({ success: true, distribuidor });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        const errorCode = (error as any)?.code;
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        if (errorCode === '23505' || errorMessage?.includes('duplicate') || errorMessage?.includes('unique')) {
          // Duplicate email handled
          res.status(409).json({ error: "Este email já está cadastrado como distribuidor" });
        } else {
          // Error logged for development only
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }
  });

  // Performance metrics endpoint
  app.post("/api/metrics", async (req, res) => {
    try {
      const metricData = insertPerformanceMetricSchema.parse(req.body);
      const metric = await storage.createPerformanceMetric(metricData);
      
      res.status(201).json({ success: true, metric });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        // Error logged for development only
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Analytics events endpoint
  app.post("/api/analytics", async (req, res) => {
    try {
      const eventData = insertAnalyticsEventSchema.parse(req.body);
      const userAgent = req.get('User-Agent');
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
        // Error logged for development only
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Analytics batch endpoint for performance
  app.post("/api/analytics/batch", async (req, res) => {
    try {
      const { events, sessionId, timestamp } = req.body;
      const userAgent = req.get('User-Agent');
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
            sessionId: sessionId,
            pageUrl: event.url || event.pageUrl,
            userAgent,
            ipAddress
          });
          results.push(analyticsEvent);
        } catch (err) {
          // Error creating individual analytics event - continuing
          // Continue processing other events
        }
      }
      
      res.status(201).json({ success: true, processed: results.length, total: events.length });
    } catch (error) {
      // Error processing analytics batch
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
