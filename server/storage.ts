import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
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
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

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
    const [lead] = await db.insert(leadsNivela).values({
      nome: leadData.nome,
      email: leadData.email,
      telefone: leadData.telefone,
      tipoEstabelecimento: leadData.tipoEstabelecimento,
      utmSource: leadData.utmSource,
      utmMedium: leadData.utmMedium,
      utmCampaign: leadData.utmCampaign,
      userAgent: leadData.userAgent,
      ipAddress: leadData.ipAddress,
    }).returning();
    return lead;
  }

  async getLeadsByEmail(email: string): Promise<LeadNivela[]> {
    return await db.select().from(leadsNivela).where(eq(leadsNivela.email, email));
  }

  async createDistribuidor(distribuidorData: InsertDistribuidor): Promise<Distribuidor> {
    const [distribuidor] = await db.insert(distribuidores).values(distribuidorData).returning();
    return distribuidor;
  }

  async getDistribuidores(): Promise<Distribuidor[]> {
    return await db.select().from(distribuidores);
  }

  async createPerformanceMetric(metricData: InsertPerformanceMetric): Promise<PerformanceMetric> {
    const [metric] = await db.insert(performanceMetrics).values(metricData).returning();
    return metric;
  }

  async createAnalyticsEvent(eventData: InsertAnalyticsEvent & { userAgent?: string; ipAddress?: string }): Promise<AnalyticsEvent> {
    const [event] = await db.insert(analyticsEvents).values({
      eventName: eventData.eventName,
      eventData: eventData.eventData,
      userId: eventData.userId,
      sessionId: eventData.sessionId,
      pageUrl: eventData.pageUrl,
      userAgent: eventData.userAgent,
      ipAddress: eventData.ipAddress,
    }).returning();
    return event;
  }
}

export const storage = new DatabaseStorage();
