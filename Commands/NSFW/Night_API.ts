import fetch from "node-fetch";
import "dotenv/config";
import { nsfw_types } from "../../Utils/Constants/NSFW_Types.json";
import type { ClientAttributes } from "../../Types/Client";
import {
  DiscordAPIError,
  type Message,
  type TextChannel,
} from "discord.js-selfbot-v13";
import logger from "../../Components/Logger/Logger";
import { prefix } from "../../user-data/Settings/Bot/Bot.json";

export default {
  name: "nsfw",
  description: "Récupère une image NSFW depuis Night API.",
  usage: `<Type> (${nsfw_types.join(" ")}) <Texte>`,
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    if ((message.channel as TextChannel).nsfw == false) {
      try {
        if (
          !nsfw_types
            .map((v) => v.toLowerCase())
            .includes(args[0].toLowerCase())
        )
          return message.channel.send(
            `**Vous devez spécifier un des types marqué ci-dessous ! \` ${nsfw_types.join(" ")}** \` Pour plus d'information sur cette commande, veuillez tapper ${prefix}help nsfw.`,
          );

        const url = `https://api.night-api.com/images/nsfw/${args[0]}`;

        try {
          const response = await fetch(url, {
            headers: {
              authorization: process.env.NIGHT_API_KEY as string,
            },
          });

          if (!response.ok) {
            logger.error("HTTP Error : Status : " + response.status);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();

          // Vérification de la structure de la réponse
          if (
            responseData.status !== 200 ||
            !responseData.content ||
            !responseData.content.url
          ) {
            logger.error("La réponse de l'API est invalide");
            throw new Error("La réponse de l'API est invalide.");
          }

          const imageUrl = responseData.content.url;

          // Envoyer l'URL de l'image dans le canal Discord
          if (!args[1]) {
            message.channel.send(imageUrl);
          } else {
            const text = args.slice(1).join(" "); // Récupérer le texte après le type d'image
            message.channel.send(text);
            return message.channel.send(imageUrl);
          }
        } catch (error) {
          logger.error("Erreur lors de la requête Night_API :", error);
          message.channel.send(
            "Une erreur est survenue lors de la requête à l'API.",
          );
        }
      } catch (error) {
        if (error instanceof DiscordAPIError) {
          logger.warning("NSFW Error : " + error);
          return message.channel.send(
            "**Erreur**\n\nCe channel n'autorise pas de contenue NSFW.",
          );
        } else {
          logger.error("NSFW Error : " + error);

          return message.channel.send(
            `**Erreur**\n\nUne erreur inconnue est survenue : \`\`\`bash\n${error}\n\`\`\``,
          );
        }
      }
    }
  },
};
