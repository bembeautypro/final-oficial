import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fdyzlqovxvdpkzlwuhjj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXpscW92eHZkcGt6bHd1aGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3ODQ1MjMsImV4cCI6MjA0MDM2MDUyM30.LvBWdCJnXt0QI-5RRHU6Zt9KNL25eFIDzZ3H81uW7to'

// Debug ENV variables
console.log('ENV URL:', supabaseUrl);
console.log('ENV ANON:', (supabaseAnonKey || '').slice(0,10) + '…');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] ENV ausentes. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
})