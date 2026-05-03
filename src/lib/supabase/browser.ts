import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

declare global {
  interface Window {
    __supabaseClient?: SupabaseClient;
  }
}

export function getSupabaseBrowserClient() {
  if (typeof window === 'undefined') {
    throw new Error('getSupabaseBrowserClient() can only be used in the browser.');
  }

  window.__supabaseClient ??= createClient(supabaseUrl, supabaseAnonKey);

  return window.__supabaseClient;
}
