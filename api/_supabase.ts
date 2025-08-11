import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL as string
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE as string

if (!url || !serviceRole) {
  console.warn('[supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE')
}

export const supabaseAdmin = createClient(url, serviceRole, {
  auth: { persistSession: false }
})