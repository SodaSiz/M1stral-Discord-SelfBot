import { ClientAttributes } from "./Client";
import { Message } from 'discord.js-selfbot-v13';

interface Command {
  type: string;
  category: string;
  usage: string;
  args: boolean;
  name: string;
  description: string;
  run: (client: ClientAttributes, message: Message, args: string[]) => void;
}

export type {Command}