import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import 'dotenv/config';

export default {
  name: "sendtoken",
  description: "Renvoie votre token d'authentification Discord (à garder secret et ne pas envoyer n'importe où !).",
  run: (client: ClientAttributes, message: Message) => {
    return message.channel.send(process.env.DISCORD_TOKEN as string);
  }
}
