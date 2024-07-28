import 'dotenv/config';
import fetch from 'node-fetch';
import logger from "../../Utils/Logger/Logger";
import { sendLongMessage } from "../../Utils/Functions/Send_Long_Messages";
import { formatNazAPIResponse } from '../../Utils/Functions/Formatters/NazAPI/NazAPI';
import type { JsonObject } from "../../Types/JSONObject";
import type { ClientAttributes } from "../../Types/Client";
import type { Message } from "discord.js-selfbot-v13";

export default {
  name: "nazapi",
  description: "Permet de faire des recherches via NazAPI",
  usage: "<Recherche>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Créer l'objet data avec les données nécessaires
    const data: JsonObject = {
      token: process.env.NAZAPI_TOKEN,
      request: args.join(' '),
      limit: 100,
      lang: 'fr'
    };

    const url = 'https://server.leakosint.com/';

    try {
      // Effectuer la requête POST avec node-fetch
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // Formater la réponse pour une meilleure lisibilité
      const formattedResponse = formatNazAPIResponse(responseData);

      // Utiliser sendLongMessage pour envoyer le message formaté
      await sendLongMessage(message, formattedResponse);
    } catch (error) {
      logger.error('Erreur lors de la requête:', error);
      message.channel.send('Une erreur est survenue lors de la requête à l\'API.');
    }
  }
};
