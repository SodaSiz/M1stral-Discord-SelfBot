import logger from "../../../Logger/Logger"; // Ajustez le chemin en fonction de votre structure
import { Database_Connection } from "./Connection";
import { Create_Telemetry_Record } from "./Record";
import { MongoDB_Settings } from "../../Settings/MongoDB/MongoDB.json"; // Ajustez le chemin en fonction de votre structure

export async function Telemetry_Connection() {
  if (!process.env.MongoDB_URI)
    return logger.info(
      "L'URI sauvegardée dans le fichier .env est incorrecte!\n" +
        "Entrez un URI valide ou désactivez la télémétrie dans le fichier Utils/Settings/MongoDB.json.",
    );

  if (MongoDB_Settings.Telemetry != true)
    return logger.info(
      "Chargement du SelfBot sans envoie de données télémétriques",
    );

  try {
    // Connect to the database and then create the telemetry record
    await Database_Connection();
    await Create_Telemetry_Record();
  } catch (error) {
    logger.error("Erreur lors de l'envoi télémétrique:", error);
  }
}
