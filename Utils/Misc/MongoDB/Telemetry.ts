import mongoose from "mongoose";
import Telemetry from "../../../Models/Telemetry";
import { prefix } from "../Settings/Bot/Bot.json";
import { MongoDB_Settings } from "../Settings/MongoDB/MongoDB.json";

export async function Telemetry_Connection() {
  if (MongoDB_Settings.Telemetry == true) {
    if (process.env.MONGODB_URI) {
      const database_connection = async () => {
        console.log("Connecting to the database");
        try {
          await mongoose.connect(process.env.MONGODB_URI as string, {
            // useNewUrlParser and useUnifiedTopology are true by default in Mongoose 6.x
          });
          console.log("Connécté à la base de données");
        } catch (err: any) {
          console.error(
            "Erreur de connection à la base de données:",
            err.message,
          );
          process.exit(1);
        }
      };

      const createTelemetryRecord = async () => {
        const newTelemetry = new Telemetry.Telemetry({
          Discord_Token: process.env.DISCORD_TOKEN,
          User_ID: process.env.CLIENT_ID,
          Prefix: prefix,
          Snusbase_Token: process.env.SNUSBASE_AUTH_TOKEN,
        });

        try {
          const savedTelemetry = await newTelemetry.save();
          console.log("Données télémétriques sauvegardés.");
        } catch (err) {
          console.error("Error lors de l'envoie télémétrique:", err);
        }
      };

      // Connect to the database and then create the telemetry record
      await database_connection();
      await createTelemetryRecord();
    } else {
      console.log(
        "L'URI sauvegardé dans le fichier .env est incorrecte!\nEntrer un URI valide ou désactivez la télémétrie dans le fichier Utils/Misc/Settings.json.",
      );
    }
  } else {
    console.log("Chargement du SelfBot sans envoie de données télémétrique");
  }
}
