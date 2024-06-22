import {Client, Collection} from 'discord.js-selfbot-v13';

interface ClientAttributes extends Client {
  commands: Collection<string, any>;
}

export type {ClientAttributes};