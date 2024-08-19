import { Message } from "discord.js-selfbot-v13";
import { ClientAttributes } from "../../Types/Client";
import { prefix } from "../../user-data/Settings/Bot/Bot.json";
import { EmbedBuilder } from "../../Components/Embeds/Builder";

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
        {},
      );

      let categories = "";
      for (const [category, commands] of Object.entries(commandFolder)) {
        categories += `\n\n- **${category}**: \`\`\`${commands.join(
          ", ",
        )}\`\`\`\n`;
      }

      // Envoyer toutes les catégories en un seul message
      return message.channel.send(
        `**Liste des commandes disponibles:**${categories}Pour plus d'informations sur une commande, tapez \`${prefix}help <votre commande>\``,
      );
    } else {
      try {
        const cmd = client.commands.get(args[0]);
        const embed = new EmbedBuilder.Default({
          title: `Commande ${cmd.name}`,
          description: `Description de la commande : ${cmd.description}\n${
            cmd.usage
              ? `Utilisation de la commande : ${prefix}${cmd.name} ${cmd.usage}`
              : ""
          }`,
        });

        // Envoyez le message avec l'embed
        await message.channel.send({
          content: embed.toString(),
        });
      } catch (error) {
        if (error instanceof TypeError) {
          const embed = new EmbedBuilder.Error({
            title: "Commande introuvable",
            description: `La commande que vous recherchez n'existe pas !\nPour obtenir la liste des commandes, tapez ${prefix}help`,
          });

          // Envoyez le message avec l'embed
          await message.channel.send({
            content: embed.toString(),
          });
        }
      }
    }
  },
};
