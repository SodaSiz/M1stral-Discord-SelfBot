import type { Message } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from '../../Types/Client';
import { snusbase_discord_messages } from '../../Utils/Functions/Formatters/Snusbase/Make_Message';

export default {
    name: 'username',
    description: 'Obtenir des informations avec le nom d\'utilisateur d\'une personne',
    usage: '<Pseudonyme>',
    args: true,
    run: async (client: ClientAttributes, message: Message, args: string[]) => snusbase_discord_messages(args[0], 'username', message)
};
