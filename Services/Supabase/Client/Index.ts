import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Les variables d'environnement SUPABASE_URL ou SUPABASE_API_KEY ne sont pas définies"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
