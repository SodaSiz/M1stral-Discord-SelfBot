import { snusbase_discord_messages } from "../../Components/Formatters/Snusbase/Make_Message";
import {
  snusbase_types,
  other_types,
  //other_url,
} from "../../Utils/Constants/Snusbase_Types.json";
import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import { EmbedBuilder } from "../../Components/Embeds/Builder";
import { prefix } from "../../user-data/Settings/Bot/Bot.json";

export default {
  name: "snusbase",
  description: "Obtenir des informations sur une personne via Snusbase",
  usage: `<Type de la recherche (${snusbase_types.join(
    ", ",
  )} ${other_types.join(", ")})> <Recherche>`,
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Uncomment the other_types if you want to use the other_types
    // Vérifie si l'argument est un type de recherche
    if (
      snusbase_types.includes(args[0]) /* && !other_types.includes(args[0])*/
    ) {
      if (!args[1]) {
        const embed = new EmbedBuilder.Error({
          description: `Vous devez spécifier une recherche.\nPour plus d'information sur la commande, veuillez tapper ${prefix}help snusbase`,
        });
        return message.channel.send({ content: embed.toString() });
      }
      /*
    if (other_types.includes(args[0]))
      return snusbase_discord_messages(
        args.slice(1).join(" "),
        args[0],
        message,
        args[0],
        other_url[args[0]]
      );
      
    else */
      //
      snusbase_discord_messages(
        args.slice(1).join(" "),
        [args[0]],
        message,
        args[0],
      );
    } else {
      // Recherche globale
      snusbase_discord_messages(args.join(" "), snusbase_types, message);
    }
  },
};
