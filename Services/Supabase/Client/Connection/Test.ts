import { supabase } from "../Index";
import logger from "../../../../Components/Logger/Logger";

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from("Telemetry")
      .select("*")
      .limit(1);
    if (error) throw error;
    logger.info("Connexion à Supabase établie avec succès");
  } catch (error) {
    logger.error("Erreur lors de la connexion à Supabase:", error);
    throw error;
  }
}
