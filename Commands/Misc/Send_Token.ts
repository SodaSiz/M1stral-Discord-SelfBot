import { WebEmbed, type Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import "dotenv/config";

export default {
  name: "sendtoken",
  description:
    "Renvoie votre token d'authentification Discord (à garder secret et ne pas envoyer n'importe où !).",
  run: (client: ClientAttributes, message: Message) => {
    const embed = new WebEmbed()
      .setTitle("Discord Token")
      .setDescription(process.env.DISCORD_TOKEN as string);
    return message.channel.send({ content: `${WebEmbed.hiddenEmbed}${embed}` });
  },
};
