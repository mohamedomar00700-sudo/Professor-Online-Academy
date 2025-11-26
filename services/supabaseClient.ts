
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://inabqthnqzgbjfuyavfb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWJxdGhucXpnYmpmdXlhdmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNDQ0MDYsImV4cCI6MjA3NTYyMDQwNn0.AJ99CI2UrNqivFFNyvrprLWwZsqyAUcfxL6SJh1WMfM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);