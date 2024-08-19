import "dotenv/config";
import BlaguesAPI from "blagues-api";
import blagues_lists from "../../Utils/Constants/Blagues_API.json";
import { prefix } from "../../user-data/Settings/Bot/Bot.json";
import { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";
import { Categories, JokeResponse } from "blagues-api/dist/types/types";
import { EmbedBuilder } from "../../Components/Embeds/Builder";
import logger from "../../Components/Logger/Logger";
export default {
  name: "blagues",
  description: "Envoie une blague aléatoire de blagues-api",
  usage: "(Catégorie)",
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    const blagues = new BlaguesAPI(process.env.BLAGUES_API_TOKEN);
    let blague: JokeResponse;

    try {
      // Vérifier s'il y a un argument
      if (args.length > 0) {
        if (args[0].toLowerCase() === "categories") {
          // Afficher la liste des catégories disponibles
          const categories = blagues_lists.categories;
          const categoriesList = categories.join(", ").toLowerCase();
          const embed = new EmbedBuilder.Default({
            title: "Blagues API",
            description: `Voici la liste des catégories disponibles : ${categoriesList}`,
          });
          return message.channel.send({ content: embed.toString() });
        } else {
          // Un argument de catégorie spécifique est fourni
          const category = args[0].toUpperCase();

          if (!blagues_lists.categories.includes(category)) {
            return message.channel.send(
              `**La catégorie de blagues ${args[0]} n'existe pas !**\nPour obtenir la liste des catégories disponibles, vous pouvez entrer ${prefix}blagues categories.`,
            );
          }

          // Accéder à la blague de la catégorie spécifiée
          blague = await blagues.randomCategorized(
            blagues.categories[category as Categories],
          );
        }
      } else {
        // Aucun argument spécifié, obtenir une blague aléatoire
        blague = await blagues.random();
      }

      // Envoyer la blague récupérée
      const embed = new EmbedBuilder.Default({
        title: blague.joke,
        description: blague.answer,
      });
      return message.channel.send({ content: embed.toString() });
    } catch (error) {
      logger.error(
        `Une erreur s'est produite lors de la récupération de la blague : ${error}`,
      );
      const embed = new EmbedBuilder.Error({
        description:
          "Une erreur s'est produite lors de la récupération de la blague.",
      });
      return message.channel.send({ content: embed.toString() });
    }
  },
};
