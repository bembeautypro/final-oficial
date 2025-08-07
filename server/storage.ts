import { db, supabase } from "./db";
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
      console.log("Inserting lead via Supabase:", leadData);
      
      // Usar cliente Supabase que está funcionando
      const { data, error } = await supabase
        .from('leads_nivela')
        .insert({
          nome: leadData.nome,
          email: leadData.email,
          telefone: leadData.telefone,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Lead created via Supabase:", data.id);
      return data as LeadNivela;
    } catch (error) {
      console.error("Database error creating lead:", error);
      throw error;
    }
  }

  async getLeadsByEmail(email: string): Promise<LeadNivela[]> {
    return await db.select().from(leadsNivela).where(eq(leadsNivela.email, email));
  }

  async createDistribuidor(distribuidorData: InsertDistribuidor): Promise<Distribuidor> {
    try {
      console.log("Inserting distribuidor via Supabase:", distribuidorData);
      
      const { data, error } = await supabase
        .from('distribuidores')
        .insert({
          nome: distribuidorData.nome,
          email: distribuidorData.email,
          telefone: distribuidorData.telefone,
          empresa: distribuidorData.empresa,
          mensagem: distribuidorData.mensagem,
          cidade: distribuidorData.cidade,
          estado: distribuidorData.estado,
          experiencia_distribuicao: distribuidorData.experienciaDistribuicao
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Distribuidor created via Supabase:", data.id);
      return data as Distribuidor;
    } catch (error) {
      console.error("Database error creating distribuidor:", error);
      throw error;
    }
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
