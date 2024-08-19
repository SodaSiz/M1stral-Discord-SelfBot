import "dotenv/config";
import fetch from "node-fetch";
import logger from "../../Components/Logger/Logger";
import { sendLongMessage } from "../../Components/Messages/Send_Long_Messages";
import { formatNazAPIResponse } from "../../Components/Formatters/NazAPI/NazAPI";
import type { JsonObject } from "../../Types/JSONObject";
import type { ClientAttributes } from "../../Types/Client";
import { type Message } from "discord.js-selfbot-v13";
import { EmbedBuilder } from "../../Components/Embeds/Builder";
import { embed_error } from "../../Components/Embeds/Error";
import { embed_warning } from "../../Components/Embeds/Warning";

export default {
  name: "nazapi",
  description: "Permet de faire des recherches via NazAPI",
  usage: "<Recherche>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Créer l'objet data avec les données nécessaires
    const data: JsonObject = {
      token: process.env.NAZAPI_TOKEN,
      request: args.join(" "),
      limit: 100,
      lang: "fr",
    };

    const url = "https://server.leakosint.com/";

    try {
      // Effectuer la requête POST avec node-fetch
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.Status === "Error") {
        const embed = new EmbedBuilder.Error({
          description: `Une erreur est survenue lors de la requête à l'API:\n${responseData["Error code"]}`,
        });
        return message.channel.send({ content: embed.toString() });
      }

      if (responseData.List.InfoLeak.startsWith("<em>")) {
        const embed = new EmbedBuilder.Warning({
          title: "Aucun résultat trouvé",
          description: `La recherche ${args.join(" ")} n'a rien donnée.`,
        });
        return message.channel.send({ content: embed.toString() });
      }

      // Formater la réponse pour une meilleure lisibilité
      const formattedResponse = formatNazAPIResponse(responseData);

      // Utiliser sendLongMessage pour envoyer le message formaté
      await sendLongMessage(message, formattedResponse);
    } catch (error) {
      logger.error("Erreur lors de la requête:", error);
      embed_error(message, "Erreur lors de la requête:\n" + error);
    }
  },
};
