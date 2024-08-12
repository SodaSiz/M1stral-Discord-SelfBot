import { Message } from "discord.js-selfbot-v13";
import { ClientAttributes } from "../../Types/Client";
import { prefix } from "../../Utils/Misc/Settings/Bot/Bot.json";
import { embed_error } from "../../Utils/Functions/Embeds/Error";
import { embed } from "../../Utils/Functions/Embeds/Default";

export default {
  name: "help",
  description: "Affiche la totalité des commandes du SelfBot",
  usage: "(Commande)",
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    if (!args.length) {
      const commandFolder = client.commands.reduce(
        (acc: { [key: string]: string[] }, cmd) => {
          acc[cmd.category] = acc[cmd.category] || [];
          acc[cmd.category].push(cmd.name);
          return acc;
        },
        {}
      );

      let categories = "";
      for (const [category, commands] of Object.entries(commandFolder)) {
        categories += `\n\n- **${category}**: \`\`\`${commands.join(
          ", "
        )}\`\`\`\n`;
      }

      // Envoyer toutes les catégories en un seul message
      return message.channel.send(
        `**Liste des commandes disponibles:**${categories}Pour plus d'informations sur une commande, tapez \`${prefix}help <votre commande>\``
      );
    } else {
      const cmd = client.commands.get(args[0]);

      if (!cmd)
        return embed_error(
          message,
          `La commande que vous recherchez n'existe pas !\nPour obtenir la liste des commandes, tapez ${prefix}help`
        );
      else {
        return embed(
          message,
          `Commande ${cmd.name}`,
          `- Description de la commande : ${cmd.description}\n${
            cmd.usage
              ? `\n- Utilisation de la commande : ${prefix}${cmd.name} ${cmd.usage}`
              : ""
          }`
        );
      }
    }
  },
};
