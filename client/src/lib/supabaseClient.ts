import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fdyzlqovxvdpkzlwuhjj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXpscW92eHZkcGt6bHd1aGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3ODQ1MjMsImV4cCI6MjA0MDM2MDUyM30.LvBWdCJnXt0QI-5RRHU6Zt9KNL25eFIDzZ3H81uW7to'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})