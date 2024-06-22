import {prefix} from '../../Utils/Misc/Settings.json';
import type {ClientAttributes} from '../../Types/Client'
import {Message} from 'discord.js-selfbot-v13';
import 'dotenv/config';

export default {
  name: 'messageCreate',
  once: false,
  execute(client: ClientAttributes, message: Message) {
    if (message.author as unknown as string != process.env.CLIENT_ID as string) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift()?.toLowerCase();
    if (!args.length) return;

    if (!cmdName) return;

    const cmd = client.commands.get(cmdName);

    if (cmd) cmd.run(client, message, args);
  }
}
