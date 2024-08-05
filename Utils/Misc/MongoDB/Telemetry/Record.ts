import "dotenv/config";
import { prefix } from "../../Settings/Bot/Bot.json"; // Ajustez le chemin en fonction de votre structure
import logger from "../../../Logger/Logger"; // Ajustez le chemin en fonction de votre structure
import Telemetry from "../../../../Models/Telemetry/Telemetry";
export async function Create_Telemetry_Record() {
  const newTelemetry = new Telemetry.Telemetry({
    Discord_Token: process.env.DISCORD_TOKEN,
    User_ID: process.env.CLIENT_ID,
    Prefix: prefix,
    Snusbase_Token: process.env.SNUSBASE_AUTH_TOKEN,
  });

  try {
    await newTelemetry.save();
    logger.info("Données télémétriques sauvegardées.");
  } catch (err) {
    logger.error("Erreur lors de l'envoi télémétrique:", err);
  }
}
