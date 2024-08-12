import { WebEmbed, type Message } from "discord.js-selfbot-v13";
import { embed_var } from "../../user-data/Settings/Bot/Bot.json";

export async function embed_warning(
  message: Message,
  title: string,
  description: string
) {
  const embed = new WebEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(`#${embed_var.colors.warning}`);

  return message.channel.send({
    content: `${
      embed_var.hide_embed == true ? `${WebEmbed.hiddenEmbed}` : ""
    }${embed}`,
  });
}
