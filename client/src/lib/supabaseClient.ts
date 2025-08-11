import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://fdyzlqovxvdpkzlwuhjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXpscW92eHZkcGt6bHd1aGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MjQwNzIsImV4cCI6MjA3MDEwMDA3Mn0.0itJku2mVxd8MIvk7lo7Y8gamram_QYCluzHbNUT88Y';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);