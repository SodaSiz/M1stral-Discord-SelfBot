import { Message } from 'discord.js-selfbot-v13';
import { embed_var } from '../../Utils/Misc/Settings.json';
import type {ClientAttributes} from '../../Types/Client';

export default {
  name: 'ping',
  description: 'Affiche la latence du bot et de l\'API de Discord.',
  run: (client: ClientAttributes, message: Message) => {
    message.delete()
    message.channel.send(`Pong ! :ping_pong::\nLatence du client: \`${client.ws.ping}\`\nLatence du bot: <t:${client.readyTimestamp ? Math.floor(client.readyTimestamp / 1000) : ''}>`);
  },
}
