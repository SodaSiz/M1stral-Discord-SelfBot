import { type Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import "dotenv/config";
import { embed } from "../../Utils/Functions/Embeds/Default";

export default {
  name: "sendtoken",
  description:
    "Renvoie votre token d'authentification Discord (à garder secret et ne pas envoyer n'importe où !).",
  run: (client: ClientAttributes, message: Message) => {
    embed(
      message,
      "Discord Token",
      (process.env.DISCORD_TOKEN as string) +
        "\n\nVotre token est personnel, si un utilisateur ou un programme vous le demande, il s'agit probablement d'une arnaque.\n(Sauf le M1stral Selfbot car on est cools)"
    );
  },
};
