import { Message } from 'discord.js-selfbot-v13';
import { ClientAttributes } from '../../Types/Client';
import { prefix } from '../../Utils/Misc/Settings.json';

export default {
  name: 'help',
  description: 'Affiche la totalité des commandes du SelfBot',
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    message.delete();

    if (!args.length) {
      const commandFolder = client.commands.reduce((acc: { [key: string]: string[] }, cmd) => {
        acc[cmd.category] = acc[cmd.category] || [];
        acc[cmd.category].push(cmd.name);
        return acc;
      }, {});

      let categories = '';
      for (const [category, commands] of Object.entries(commandFolder)) {
        categories += `\n\n+ ${category}: ${commands.join(', ')}`;
      }

      // Envoyer toutes les catégories en un seul message
      return message.channel.send(`Liste des commandes disponibles: \n\`\`\`${categories}\n\`\`\`\nPour plus d'informations sur une commande, tapez \`${prefix}help <votre commande>\``);
    } else {
      const cmd = client.commands.get(args[0])

      if (!cmd) {
        return message.channel.send(`**La commande que vous recherchez n'existe pas !**\nPour obtenir la liste des commandes, tapez \`${prefix}help\``);
      } else {
        return message.channel.send(`**Commande ${cmd.name}**\nDescription de la commande : \n\`${cmd.description}\``);
      }
    }
  }
}
