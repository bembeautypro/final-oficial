import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fdyzlqovxvdpkzlwuhjj.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXpscW92eHZkcGt6bHd1aGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MjQwNzIsImV4cCI6MjA3MDEwMDA3Mn0.0itJku2mVxd8MIvk7lo7Y8gamram_QYCluzHbNUT88Y'

export const supabase = createClient(supabaseUrl, supabaseKey)