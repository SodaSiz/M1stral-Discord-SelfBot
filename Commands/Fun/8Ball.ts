import { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";
import { EmbedBuilder } from "../../Components/Embeds/Builder";

export default {
  name: "8ball",
  description: "Répond à une question à la bille magique",
  usage: "<Question>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    let question = args.join(" ").trim();
    if (!question.endsWith("?")) question += " ?";
    const replies = ["Oui", "Non", "Peut-être", "Probablement", "Absolument"];

    const embed = new EmbedBuilder.Default({
      title: "8Ball",
      description: `Question: ${question}\n\nRéponse: ${
        replies[Math.floor(Math.random() * replies.length)]
      }`,
    });

    // Envoyez le message avec l'embed
    await message.channel.send({
      content: embed.toString(),
    });
  },
};
