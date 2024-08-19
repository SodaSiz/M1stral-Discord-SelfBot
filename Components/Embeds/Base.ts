import { EmbedAuthorData, WebEmbed } from "discord.js-selfbot-v13";
import { embed_var } from "../../user-data/Settings/Bot/Bot.json";

export class Embed {
  protected embed: WebEmbed;

  constructor() {
    this.embed = new WebEmbed();
  }

  setTitle(title: string): this {
    this.embed.setTitle(title);
    return this;
  }

  setDescription(description: string): this {
    this.embed.setDescription(description);
    return this;
  }

  setColor(color: string): this {
    this.embed.setColor(`#${color}`);
    return this;
  }

  setImage(url: string): this {
    this.embed.setImage(url);
    return this;
  }

  setThumbnail(url: string): this {
    this.embed.setThumbnail(url);
    return this;
  }

  setVideo(url: string): this {
    this.embed.setVideo(url);
    return this;
  }

  setProvider(name: string, url: string): this {
    this.embed.setProvider({ name, url });
    return this;
  }

  setAuthor(author: EmbedAuthorData): this {
    this.embed.setAuthor(author);
    return this;
  }

  setURL(url: string): this {
    this.embed.setURL(url);
    return this;
  }

  setRedirect(url: string): this {
    this.embed.setRedirect(url);
    return this;
  }

  toString(hiddenEmbed: boolean = embed_var.hide_embed): string {
    if (hiddenEmbed === true)
      return `${WebEmbed.hiddenEmbed}${this.embed.toString()}`;
    else return this.embed.toString();
  }

  build(): WebEmbed {
    return this.embed;
  }
}
