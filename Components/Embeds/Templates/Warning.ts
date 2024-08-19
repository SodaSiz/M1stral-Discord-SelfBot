import { Embed } from "../Base";
import { embed_var } from "../../../user-data/Settings/Bot/Bot.json";
import { WarningEmbedOptions } from "../../../Types/Embeds/Warning";
import { EmbedAuthorData } from "discord.js-selfbot-v13";

export class Warning extends Embed {
  constructor(options: WarningEmbedOptions) {
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

    if (title) this.setTitle(title);
    else this.setTitle("Avertissement");

    if (description) this.setDescription(description);
    else
      this.setDescription(
        "Une erreur est survenue lors de l'exécution de votre commande.",
      );

    if (color) this.setColor(color);
    else this.setColor(embed_var.colors.warning);

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
