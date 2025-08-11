import { pgTable, text, uuid, timestamp, inet, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Leads table for NIVELA® landing page - simplified structure
export const leadsNivela = pgTable("leads_nivela", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  telefone: text("telefone").notNull(),
  hp: text("hp").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Performance metrics table
export const performanceMetrics = pgTable("performance_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  metricName: text("metric_name").notNull(),
  metricValue: text("metric_value").notNull(),
  userAgent: text("user_agent"),
  pageUrl: text("page_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Analytics events table
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventName: text("event_name").notNull(),
  eventData: jsonb("event_data"),
  userId: uuid("user_id"),
  sessionId: text("session_id"),
  pageUrl: text("page_url"),
  userAgent: text("user_agent"),
  ipAddress: inet("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Distributors table - simplified structure matching interface
export const distribuidores = pgTable("distribuidores", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone").notNull(),
  empresa: text("empresa"),
  cidade: text("cidade"),
  estado: text("estado"),
  mensagem: text("mensagem"),
  hp: text("hp").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Insert schemas
export const insertLeadNivelaSchema = createInsertSchema(leadsNivela).pick({
  nome: true,
  email: true,
  telefone: true,
});

export const insertDistribuidorSchema = createInsertSchema(distribuidores).pick({
  nome: true,
  email: true,
  telefone: true,
  empresa: true,
  mensagem: true,
  cidade: true,
  estado: true,
}).partial({
  empresa: true,
  mensagem: true,
  cidade: true,
  estado: true,
});

export const insertPerformanceMetricSchema = createInsertSchema(performanceMetrics).pick({
  metricName: true,
  metricValue: true,
  userAgent: true,
  pageUrl: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  eventName: true,
  eventData: true,
  userId: true,
  sessionId: true,
  pageUrl: true,
  userAgent: true,
});

// Types
export type InsertLeadNivela = z.infer<typeof insertLeadNivelaSchema>;
export type LeadNivela = typeof leadsNivela.$inferSelect;

export type InsertDistribuidor = z.infer<typeof insertDistribuidorSchema>;
export type Distribuidor = typeof distribuidores.$inferSelect;

export type InsertPerformanceMetric = z.infer<typeof insertPerformanceMetricSchema>;
export type PerformanceMetric = typeof performanceMetrics.$inferSelect;

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
