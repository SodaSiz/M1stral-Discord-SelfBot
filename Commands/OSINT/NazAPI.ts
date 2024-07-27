import fetch from 'node-fetch';
import 'dotenv/config';
import type { JsonObject } from "../../Types/JSONObject";
import type { ClientAttributes } from "../../Types/Client"; 
import type { Message } from "discord.js-selfbot-v13"; 

export default {
  name: "nazapi",
  description: "Permet de faire des recherches via NazAPI",
  usage: "<Recherche>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Joindre les éléments du tableau args avec un espace
    const request_id = args.join(' ');

    // Créer l'objet data avec les données nécessaires
    const data: JsonObject = {
      token: process.env.NAZAPI_TOKEN,
      request: request_id,
      limit: 75,
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
      console.log('Response:', responseData);
      // Traitement de la réponse, par exemple, envoyer une réponse à l'utilisateur Discord
      message.channel.send(`Réponse de l'API : ${responseData}`);
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      message.channel.send('Une erreur est survenue lors de la requête à l\'API.');
    }
  }
};

