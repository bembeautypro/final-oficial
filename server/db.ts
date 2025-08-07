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

// URL PostgreSQL do Supabase fornecida pelo usuário
const supabaseDatabaseUrl = "postgresql://postgres.fdyzlqovxvdpkzlwuhjj:Ninaflor1403@@aws-1-sa-east-1.pooler.supabase.com:6543/postgres";

console.log("Connecting to Supabase pooler");

const client = postgres(supabaseDatabaseUrl, {
  ssl: { rejectUnauthorized: false },
  max: 10,
  idle_timeout: 30,
  connect_timeout: 10,
  prepare: false,
});

export const db = drizzle(client, { schema });
