import { Telemetry } from "../../../../Types/Supabase/Telemetry";
import { supabase } from "../../Client/Index";
import logger from "../../../../Components/Logger/Logger";

export const telemetryService = {
  async sendTelemetry(
    data: Omit<Telemetry, "id" | "created_at">
  ): Promise<Telemetry | null> {
    try {
      const { data: insertedData, error } = await supabase
        .from("Telemetry")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return insertedData;
    } catch (error) {
      logger.error("Erreur lors de l'envoi des données télémétriques:", error);
      if (error instanceof Error) {
        logger.error("Message d'erreur:", error.message);
        logger.error("Stack trace:", error.stack);
      } else {
        logger.error("Erreur inconnue:", JSON.stringify(error));
      }
      throw error;
    }
  },

  async getLatestTelemetry(): Promise<Telemetry | null> {
    try {
      const { data, error } = await supabase
        .from("Telemetry")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error(
        "Erreur lors de la récupération des données télémétriques:",
        error
      );
      throw error;
    }
  },
};
