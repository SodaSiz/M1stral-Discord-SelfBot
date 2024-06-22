import { Message } from 'discord.js-selfbot-v13';
import { embed_var } from '../../Utils/Misc/Settings.json';
import { send_request } from '../../Snusbase/Core/Send_Request';
import type {ClientAttributes} from '../../Types/Client';

export default {
  name: 'password_hashed',
  description: 'Obtenir des informations avec un mot de passe hashé d\'une personne',
  run: (client: ClientAttributes, message: Message, args: string[]) => {
    message.delete()
    send_request('tools/hash-lookup', {
      terms: [args[0]],
      types: ['hash'],
    }).then(response => {
      console.log(JSON.stringify(response.results))
      message.channel.send(`\`\`\`json\n${JSON.stringify(response.results, null, 2)}\n\`\`\``);
    })
  },
}