import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rakgceqjisayfirnpsgq.supabase.co' 
const supabaseKey = process.env.REACT_APP_ANON_KEY

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
