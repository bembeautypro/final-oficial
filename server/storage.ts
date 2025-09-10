import { db } from "./db";
import { 
  leadsNivela, 
  distribuidores, 
  performanceMetrics, 
  analyticsEvents,
  type LeadNivela,
  type Distribuidor,
  type PerformanceMetric,
  type AnalyticsEvent,
  type InsertLeadNivela,
  type InsertDistribuidor,
  type InsertPerformanceMetric,
  type InsertAnalyticsEvent
} from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  // Lead NIVELA operations
  createLeadNivela(lead: InsertLeadNivela & { userAgent?: string; ipAddress?: string }): Promise<LeadNivela>;
  getLeadsByEmail(email: string): Promise<LeadNivela[]>;
  
  // Distribuidor operations
  createDistribuidor(distribuidor: InsertDistribuidor): Promise<Distribuidor>;
  getDistribuidores(): Promise<Distribuidor[]>;
  
  // Performance metrics operations
  createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric>;
  
  // Analytics events operations
  createAnalyticsEvent(event: InsertAnalyticsEvent & { userAgent?: string; ipAddress?: string }): Promise<AnalyticsEvent>;
}

export class DatabaseStorage implements IStorage {
  async createLeadNivela(leadData: InsertLeadNivela & { userAgent?: string; ipAddress?: string }): Promise<LeadNivela> {
    try {
      // SIMPLIFIED - 3 FIELDS ONLY
      const [lead] = await db
        .insert(leadsNivela)
        .values({
          nome: leadData.nome,
          email: leadData.email,
          telefone: leadData.telefone
        })
        .returning();

      return lead;
    } catch (error) {
      // Log apenas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.error("Database error creating lead:", error);
      }
      throw error;
    }
  }

  async getLeadsByEmail(email: string): Promise<LeadNivela[]> {
    return await db.select().from(leadsNivela).where(eq(leadsNivela.email, email));
  }

  async createDistribuidor(distribuidorData: InsertDistribuidor): Promise<Distribuidor> {
    try {
      // SIMPLIFIED - 3 FIELDS ONLY
      const [distribuidor] = await db
        .insert(distribuidores)
        .values({
          nome: distribuidorData.nome,
          email: distribuidorData.email,
          telefone: distribuidorData.telefone
        })
        .returning();

      return distribuidor;
    } catch (error) {
      // Log apenas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.error("Database error creating distribuidor:", error);
      }
      throw error;
    }
  }

  async getDistribuidores(): Promise<Distribuidor[]> {
    return await db.select().from(distribuidores);
  }

  async createPerformanceMetric(metricData: InsertPerformanceMetric): Promise<PerformanceMetric> {
    try {
      const [metric] = await db
        .insert(performanceMetrics)
        .values({
          metricName: metricData.metricName,
          metricValue: metricData.metricValue,
          userAgent: metricData.userAgent,
          pageUrl: metricData.pageUrl
        })
        .returning();

      return metric;
    } catch (error) {
      // Log apenas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.error("Database error creating performance metric:", error);
      }
      throw error;
    }
  }

  async createAnalyticsEvent(eventData: InsertAnalyticsEvent & { userAgent?: string; ipAddress?: string }): Promise<AnalyticsEvent> {
    try {
      const [event] = await db
        .insert(analyticsEvents)
        .values({
          eventName: eventData.eventName,
          eventData: eventData.eventData,
          userId: eventData.userId,
          sessionId: eventData.sessionId,
          pageUrl: eventData.pageUrl,
          userAgent: eventData.userAgent,
          ipAddress: eventData.ipAddress
        })
        .returning();

      return event;
    } catch (error) {
      // Log apenas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.error("Database error creating analytics event:", error);
      }
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
