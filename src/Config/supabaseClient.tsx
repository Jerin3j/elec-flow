import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl :string  = 'https://rakgceqjisayfirnpsgq.supabase.co'
const supabaseKey :string= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2djZXFqaXNheWZpcm5wc2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMjQyMDQsImV4cCI6MjAxNjYwMDIwNH0.UIsWZMKcH_or-2U_Kn0vAamDS9hUCk8tHanVHHzhrug'

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
