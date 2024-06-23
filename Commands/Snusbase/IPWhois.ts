import { Message } from 'discord.js-selfbot-v13';
import { get_output_snusbase } from '../../Snusbase/Core/Get_Output';
import type { ClientAttributes } from '../../Types/Client';

export default {
    name: 'ipwhois',
    description: 'Obtenir des informations sur l\'adresse IP d\'une personne',
    run: async (client: ClientAttributes, message: Message, args: string[]) => {
      message.delete();

      // Appel asynchrone à get_output_snusbase
      const result = await get_output_snusbase('tools/ip-whois', { terms: [args[0]] });

      message.channel.send(result);
    },
};
