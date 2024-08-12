import { snusbase_discord_messages } from "../../Utils/Functions/Formatters/Snusbase/Make_Message";
import {
  snusbase_types,
  other_types,
  //other_url,
} from "../../Utils/Lists/Snusbase_Types.json";
import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import { embed_error } from "../../Utils/Functions/Embeds/Error";
import { prefix } from "../../Utils/Misc/Settings/Bot/Bot.json";

export default {
  name: "snusbase",
  description: "Obtenir des informations sur une personne via Snusbase",
  usage: `<Type de la recherche (${snusbase_types.join(
    ", "
  )} ${other_types.join(", ")})> <Recherche>`,
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Uncomment the other_types if you want to use the other_types
    if (
      !snusbase_types.includes(args[0]) /* && !other_types.includes(args[0])*/
    )
      return embed_error(
        message,
        `La recherche doit être un type de recherche valide.\nPour plus d'information sur la commande, veuillez tapper ${prefix}help snusbase`
      );

    if (!args[1])
      return embed_error(
        message,
        `Vous devez spécifier une recherche.\nPour plus d'information sur la commande, veuillez tapper ${prefix}help snusbase`
      );
    /*
    if (other_types.includes(args[0]))
      return snusbase_discord_messages(
        args.slice(1).join(" "),
        args[0],
        message,
        other_url[args[0]]
      );
      
    else */
    snusbase_discord_messages(args.slice(1).join(" "), args[0], message);
  },
};
