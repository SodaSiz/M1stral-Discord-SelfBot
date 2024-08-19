import { type Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import "dotenv/config";
import { EmbedBuilder } from "../../Components/Embeds/Builder";

export default {
  name: "sendtoken",
  description:
    "Renvoie votre token d'authentification Discord (à garder secret et ne pas envoyer n'importe où !).",
  run: (client: ClientAttributes, message: Message) => {
    const embed = new EmbedBuilder.Default({
      title: "Discord Token",
      description: `${process.env.DISCORD_TOKEN}\n\nVotre token est personnel, si un utilisateur ou un programme vous le demande, il s'agit probablement d'une arnaque.\n(Sauf le M1stral Selfbot car on est cools)`,
    });

    message.channel.send({ content: embed.toString() });
  },
};
