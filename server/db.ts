import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configuração para Supabase
const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres:Ninaflor1403@@db.fdyzlqovxvdpkzlwuhjj.supabase.co:6543/postgres";

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Please add your Supabase connection string.",
  );
}

// Configuração específica para Supabase
export const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export const db = drizzle({ client: pool, schema });
