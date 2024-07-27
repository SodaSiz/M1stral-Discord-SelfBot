import type { Message } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from '../../Types/Client';
import { snusbase_discord_messages } from '../../Snusbase/Discord/Make_Message';

export default {
    name: 'ip',
    description: 'Obtenir des informations sur l\'adresse IP d\'une personne',
    usage: '<Adresse IP>',
    args: true,
    run: async (client: ClientAttributes, message: Message, args: string[]) => snusbase_discord_messages(args[0], 'lastip', message),
};
