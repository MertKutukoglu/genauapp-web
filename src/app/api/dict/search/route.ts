import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * /api/dict/search, the Route Handler behind DictionarySearch.
 *
 * Calls public.dict_search(q, limit_n) on Supabase (anon key +
 * grant execute) and returns a slim JSON shape the client renders.
 * Edge-cached for 1h per normalized query so the first visitor
 * pays the RPC, the rest pay the CDN.
 *
 * Logging: zero-result queries are dropped into dict_search_log
 * via service role... not here. The current anon key can't write
 * that table and we don't ship the service role to the edge.
 * We'll add the logging in a follow-up with a server-only client
 * once a service role key is in the env.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface DictSearchHit {
  slug: string;
  german: string;
  type: string;
  level: string;
  article: string | null;
  translation_en: string | null;
  translation_tr: string | null;
  match_lang: "de" | "en" | "tr";
  match_text: string | null;
}

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
  if (!q) {
    return NextResponse.json(
      { results: [] },
      { headers: { "Cache-Control": "public, max-age=0" } },
    );
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { results: [], error: "Supabase not configured" },
      { status: 500 },
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { data, error } = await supabase.rpc("dict_search", {
    q,
    limit_n: 20,
  });

  if (error) {
    return NextResponse.json(
      { results: [], error: error.message },
      { status: 500 },
    );
  }

  const results = (data ?? []) as DictSearchHit[];

  return NextResponse.json(
    { results },
    {
      headers: {
        // Edge cache 1h per query, stale-while-revalidate 1d so
        // repeat lookups are free.
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
