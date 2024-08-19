import { Embed } from "../Base";
import { embed_var } from "../../../user-data/Settings/Bot/Bot.json";
import { DefaultEmbedOptions } from "../../../Types/Embeds/Default";
import { EmbedAuthorData } from "discord.js-selfbot-v13";

export class Default extends Embed {
  constructor(options: DefaultEmbedOptions) {
    super();
    const {
      title,
      description,
      color,
      image,
      thumbnail,
      video,
      url,
      redirect,
      provider,
      author,
    } = options;

    this.setTitle(title).setDescription(description);

    if (color) this.setColor(color);
    else this.setColor(embed_var.colors.default);

    if (image) this.setImage(image);
    if (thumbnail) this.setThumbnail(thumbnail);
    if (video) this.setVideo(video);
    if (url) this.setURL(url);
    if (redirect) this.setRedirect(redirect);
    if (provider) this.setProvider(provider.name, provider.url);
    if (author) this.setAuthor(author as EmbedAuthorData);
  }

  setVideo(url: string): this {
    this.embed.setVideo(url);
    return this;
  }
}
