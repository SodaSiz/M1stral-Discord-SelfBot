import { Message } from 'discord.js-selfbot-v13';
import { get_output_snusbase } from '../../Snusbase/Core/Get_Output';
import type { ClientAttributes } from '../../Types/Client';

export default {
    name: 'password_hashed',

    description: 'Obtenir des informations avec un mot de passe hashé d\'une personne',
    run: async (client: ClientAttributes, message: Message, args: string[]) => {
      message.delete();

      // Appel asynchrone à get_output_snusbase
      const result = await get_output_snusbase('tools/hash-lookup', { terms: [args[0]], types: ['hash'] });

      message.channel.send(result);
    },
};
