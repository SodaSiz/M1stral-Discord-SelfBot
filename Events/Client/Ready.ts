import mongoose from 'mongoose';
import type { ClientAttributes } from '../../Types/Client';
import 'dotenv/config';  // Ensure dotenv is loaded to access .env variables
import { MongoDB_Settings, prefix } from '../../Utils/Misc/Settings.json';
import Telemetry from '../../Models/Telemetry';
import fs from 'fs';
import { PresenceData } from 'discord.js-selfbot-v13';

export default {
  name: 'ready',
  async execute(client: ClientAttributes) {

    // RichPresence
    let presenceData: PresenceData;
    try {
      const data = fs.readFileSync('./Utils/Misc/RPC.json', 'utf8');
      presenceData = JSON.parse(data);
    } catch (err) {
      console.error('Erreur lors de la lecture du fichier JSON:', err);
      return;
    }
    client.user?.setPresence(presenceData);
    
    // MongoDB Setup
    if (MongoDB_Settings.Telemetry) {
      if (process.env.MONGODB_URI) {
        const database_connection = async () => {
          console.log('Connecting to the database');
          try {
            await mongoose.connect(process.env.MONGODB_URI as string, {
              // useNewUrlParser and useUnifiedTopology are true by default in Mongoose 6.x
            });
            console.log('Connécté à la base de données');
          } catch (err: any) {
            console.error('Erreur de connection à la base de données:', err.message);
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
            console.log('Données télémétriques sauvegardés.');
          } catch (err) {
            console.error('Error lors de l\'envoie télémétrique:', err);
          }
        };

        // Connect to the database and then create the telemetry record
        await database_connection();
        await createTelemetryRecord();
      } else {
        console.log(
          "L'URI sauvegardé dans le fichier .env est incorrecte!\nEntrer un URI valide ou désactivez la télémétrie dans le fichier Utils/Misc/Settings.json."
        );
      }
    } else {
      console.log('Chargement du SelfBot sans envoie de données télémétrique');
    }
  },
};
