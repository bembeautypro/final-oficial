import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Verificar credenciais Supabase
const supabaseApiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseApiUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials:", { 
    hasUrl: !!supabaseApiUrl, 
    hasKey: !!supabaseServiceKey 
  });
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
}

// Cliente Supabase
export const supabase = createClient(supabaseApiUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Usar DATABASE_URL do ambiente (mais seguro)
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable must be set");
}

const client = postgres(databaseUrl, {
  ssl: { rejectUnauthorized: false },
  max: 10,
  idle_timeout: 30,
  connect_timeout: 10,
  prepare: false,
});

export const db = drizzle(client, { schema });
