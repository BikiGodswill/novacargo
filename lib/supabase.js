import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn(
    "[NovaCargo] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
    "Copy .env.local.example → .env.local and fill in your Supabase project values."
  );
}

// Use placeholder values during build so the module doesn't throw.
// Real calls will fail gracefully (caught in db.js) until env vars are set.
export const supabase = createClient(
  url || "https://placeholder-project.supabase.co",
  key || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder"
);
