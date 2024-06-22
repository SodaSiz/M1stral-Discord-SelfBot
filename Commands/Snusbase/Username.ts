import { Message } from 'discord.js-selfbot-v13';
import { embed_var } from '../../Utils/Misc/Settings.json';
import { send_request } from '../../Snusbase/Core/Send_Request';
import type {ClientAttributes} from '../../Types/Client';

export default {
  name: 'username',
  description: 'Obtenir des informations avec le nom d\'utilisateur d\'une personne',
  run: (client: ClientAttributes, message: Message, args: string[]) => {
    message.delete()
    send_request('data/search', {
      terms: [args[0]],
      types: ['username'],
      wildcard: false
    }).then(response => {
      console.log(JSON.stringify(response.results))
      message.channel.send(`\`\`\`json\n${JSON.stringify(response.results, null, 2)}\n\`\`\``);
    })
  },
}