import { Message } from 'discord.js-selfbot-v13';
import { get_output_snusbase } from '../../Snusbase/Core/Get_Output';
import type { ClientAttributes } from '../../Types/Client';

export default {
    name: 'username',
    description: 'Obtenir des informations avec le nom d\'utilisateur d\'une personne',
    run: async (client: ClientAttributes, message: Message, args: string[]) => {
      message.delete();

      // Appel asynchrone à get_output_snusbase
      const result = await get_output_snusbase('data/search', { terms: [args[0]], types: ['username'], wildcard: false });

      message.channel.send(result);
    },
};
