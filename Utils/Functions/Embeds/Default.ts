import {
  type ColorResolvable,
  type MessageEmbedProvider,
  WebEmbed,
  type Message,
} from "discord.js-selfbot-v13";
import { embed_var } from "../../Misc/Settings/Bot/Bot.json";

export async function embed(
  message: Message,
  title: string,
  description: string,
  options: {
    color?: string;
    author?: string;
    thumbnail?: string;
    image?: string;
    url?: string;
    video?: string;
    provider?: MessageEmbedProvider;
    redirect?: string;
  } = {}
) {
  const {
    color = `#${embed_var.colors.default}`,
    author = "",
    thumbnail = "",
    image = "",
    url = "",
    video = "",
    provider = { name: "", url: "" },
    redirect = "",
  } = options;

  const embed = new WebEmbed()
    .setColor(color as ColorResolvable)
    .setTitle(title);

  if (description) embed.setDescription(description);
  if (author) embed.setAuthor({ name: author });
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (image) embed.setImage(image);
  if (url) embed.setURL(url);
  if (video) embed.setVideo(video);
  if (provider.name && provider.url) embed.setProvider(provider);
  if (redirect) embed.setRedirect(redirect);

  const content = embed_var.hide_embed
    ? `${WebEmbed.hiddenEmbed}${embed}`
    : `${embed}`;

  return message.channel.send({ content });
}
