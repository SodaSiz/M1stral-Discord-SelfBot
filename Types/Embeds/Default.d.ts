import type { EmbedAuthorData } from "discord.js-selfbot-v13";

interface DefaultEmbedOptions {
  title: string;
  description: string;
  color?: string;
  image?: string;
  thumbnail?: string;
  video?: string;
  url?: string;
  redirect?: string;
  provider?: { name: string; url: string };
  author?: EmbedAuthorData;
}

export { DefaultEmbedOptions };