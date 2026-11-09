import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client, singleton per tab.
 *
 * - `persistSession: false` — the waitlist writes are anonymous POSTs
 *   under RLS; we don't use Supabase Auth from the web and don't
 *   want it caching an auth token in localStorage.
 * - `autoRefreshToken: false` — same reason.
 *
 * This client never carries the service-role key. Only the publishable
 * anon key, which is safe to ship to the browser.
 *
 * Env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!URL || !ANON_KEY) return null;
  if (cached) return cached;
  cached = createClient(URL, ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return cached;
}

/** True iff Supabase env vars are present and the client can be built. */
export function isSupabaseConfigured(): boolean {
  return Boolean(URL && ANON_KEY);
}
