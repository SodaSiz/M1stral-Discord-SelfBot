import type { Message } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from '../../Types/Client';
import { snusbase_discord_messages } from '../../Utils/Functions/Formatters/Snusbase/Make_Message';

export default {
    name: 'email',
    description: 'Obtenir des informations sur l\'EMail d\'une personne',
    usage: '<Adresse EMail>',
    args: true,
    run: async (client: ClientAttributes, message: Message, args: string[]) => snusbase_discord_messages(args[0], 'email', message)
};
