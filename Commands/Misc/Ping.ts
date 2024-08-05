import { WebEmbed, type Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";

export default {
  name: "ping",
  description: "Affiche la latence du bot et de l'API de Discord.",
  run: (client: ClientAttributes, message: Message) => {
    const embed = new WebEmbed()
      .setTitle("Pong ! 🏓")
      .setDescription(
        `Latence du client : ${client.ws.ping}ms${
          client.readyTimestamp
            ? `\nLatence du bot: ${Math.floor(client.readyTimestamp / 1000)}`
            : ""
        }`
      );
    return message.channel.send({ content: `${WebEmbed.hiddenEmbed}${embed}` });
  },
};
