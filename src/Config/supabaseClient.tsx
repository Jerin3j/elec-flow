import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oolhltslerqcijvmgbol.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vbGhsdHNsZXJxY2lqdm1nYm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Njc5MTksImV4cCI6MjA1NjU0MzkxOX0.H8bGUXo9k3j_RVToR_rTu1gzQ2tLoCFAH7iTZM8eNOE'

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
