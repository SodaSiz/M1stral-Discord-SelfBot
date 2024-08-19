import type { Message, User } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import { EmbedBuilder } from "../../Components/Embeds/Builder";

export default {
  name: "pp",
  description: "Obtenir la photo de profil d'un utilisateur",
  aliases: ["get-pp", "get-pfp"],
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // If the user doesn't mention a user, check if an ID is provided, else use the author
    let user: User;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first() as User;
    } else if (args[0]) {
      user = await client.users.fetch(args[0]);
      // Check if the ID is valid
      if (!user) {
        const embed = new EmbedBuilder.Warning({
          description:
            "Utilisateur non trouvé. Veuillez fournir une mention, un ID ou un nom d'utilisateur valide.",
        });
        return message.channel.send({ content: embed.toString() });
      }
    } else {
      user = message.author;
    }

    const embed = new EmbedBuilder.Default({
      title: user.username,
      description: user.displayAvatarURL({ dynamic: true, size: 4096 }),
    });

    return message.channel.send({ content: embed.toString() });
  },
};
