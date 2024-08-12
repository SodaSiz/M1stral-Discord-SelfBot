import { type Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import { embed } from "../../Components/Embeds/Default";

export default {
  name: "ping",
  description: "Affiche la latence du bot et de l'API de Discord.",
  run: (client: ClientAttributes, message: Message) => {
    embed(
      message,
      "Pong ! 🏓",
      `Latence du client : ${client.ws.ping}ms${
        client.readyTimestamp
          ? `\nLatence du bot: ${Math.floor(client.readyTimestamp / 1000)}ms`
          : ""
      }`
    );
  },
};
