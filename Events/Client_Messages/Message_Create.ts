import {prefix, auto_delete_message} from '../../Utils/Misc/Settings.json';
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

    if (!cmdName) return;

    const cmd = client.commands.get(cmdName);

    
    if (cmd) {
      if (cmd.args == true && !args.length)
          return message.reply(`**Vous devez spécifier des arguments pour votre commande !**\nPour plus de détail, executez \`${prefix}help ${cmdName}\``)
      if (auto_delete_message == true)
        message.delete()
      cmd.run(client, message, args)
    }
    else return message.reply(`**Cette commande n'existe pas !**\nPour obtenir la liste des commandes, veuillez executer la commande \`${prefix}help\``)
  }
}
