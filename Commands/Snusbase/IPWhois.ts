import { Message } from 'discord.js-selfbot-v13';
import { embed_var } from '../../Utils/Misc/Settings.json';
import { send_request } from '../../Snusbase/Core/Send_Request';
import type {ClientAttributes} from '../../Types/Client';

export default {
  name: 'ipwhois',
  description: 'Obtenir des informations sur l\'adresse IP d\'une personne',
  run: (client: ClientAttributes, message: Message, args: string[]) => {
    message.delete()
    send_request('tools/ip-whois', {
      terms: [args[0]],
    }).then(response => {
      console.log(JSON.stringify(response.results))
      message.channel.send(`\`\`\`json\n${JSON.stringify(response.results, null, 2)}\n\`\`\``);
    })
  },
}