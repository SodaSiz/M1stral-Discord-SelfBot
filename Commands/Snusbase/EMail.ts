import { Message } from 'discord.js-selfbot-v13';
import { get_output_snusbase } from '../../Snusbase/Core/Get_Output';
import type { ClientAttributes } from '../../Types/Client';

export default {
    name: 'email',
    description: 'Obtenir des informations sur l\'EMail d\'une personne',
    usage: '<Adresse EMail>',
    args: true,
    run: async (client: ClientAttributes, message: Message, args: string[]) => {
        // Appel asynchrone à get_output_snusbase
        const results = await get_output_snusbase('data/search', { terms: [args[0]], types: ['email'], wildcard: false });

        for (const result of results) {
            await message.channel.send(result);
        }
    },
};
