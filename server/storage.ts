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
      
      // Simple Supabase insert with essential fields only
      const { data, error } = await supabase
        .from('distribuidores')
        .insert({
          nome: distribuidorData.nome,
          email: distribuidorData.email,
          telefone: distribuidorData.telefone || "Não informado",
          empresa: distribuidorData.empresa || null,
          cidade: distribuidorData.cidade || "São Paulo",
          estado: distribuidorData.estado || "SP",
          mensagem: distribuidorData.mensagem || null
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      const newDistribuidor = data as Distribuidor;
      console.log("Distribuidor created via Supabase:", newDistribuidor.id);
      return newDistribuidor;
    } catch (error) {
      console.error("Database error creating distribuidor:", error);
      throw error;
    }
  }

  async getDistribuidores(): Promise<Distribuidor[]> {
    return await db.select().from(distribuidores);
  }

  async createPerformanceMetric(metricData: InsertPerformanceMetric): Promise<PerformanceMetric> {
    try {
      console.log("Inserting performance metric via Supabase:", metricData);
      
      const { data, error } = await supabase
        .from('performance_metrics')
        .insert({
          metric_name: metricData.metricName,
          metric_value: metricData.metricValue,
          user_agent: metricData.userAgent,
          page_url: metricData.pageUrl
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error creating metric:", error);
        throw error;
      }

      console.log("Performance metric created via Supabase:", data.id);
      return data as PerformanceMetric;
    } catch (error) {
      console.error("Database error creating performance metric:", error);
      throw error;
    }
  }

  async createAnalyticsEvent(eventData: InsertAnalyticsEvent & { userAgent?: string; ipAddress?: string }): Promise<AnalyticsEvent> {
    try {
      console.log("Inserting analytics event via Supabase:", eventData);
      
      const { data, error } = await supabase
        .from('analytics_events')
        .insert({
          event_name: eventData.eventName,
          session_id: eventData.sessionId,
          page_url: eventData.pageUrl,
          user_agent: eventData.userAgent
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error creating analytics event:", error);
        throw error;
      }

      console.log("Analytics event created via Supabase:", data.id);
      return data as AnalyticsEvent;
    } catch (error) {
      console.error("Database error creating analytics event:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
