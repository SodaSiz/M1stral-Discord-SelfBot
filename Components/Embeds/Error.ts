import { WebEmbed, type Message } from "discord.js-selfbot-v13";
import { embed_var } from "../../user-data/Settings/Bot/Bot.json";

export async function embed_error(message: Message, error: string) {
  const embed = new WebEmbed()
    .setTitle("Erreur")
    .setDescription(error)
    .setColor(`#${embed_var.colors.error}`);

  return message.channel.send({
    content: `${
      embed_var.hide_embed == true ? `${WebEmbed.hiddenEmbed}` : ""
    }${embed}`,
  });
}
