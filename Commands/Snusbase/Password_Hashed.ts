import { Message } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from '../../Types/Client';
import { snusbase_discord_messages } from '../../Utils/Functions/Formatters/Snusbase/Make_Message';

export default {
    name: 'password_hashed',
    description: 'Obtenir des informations avec un mot de passe hashé d\'une personne',
    usage: '<Mot de passe hashé>',
    args: true,
    run: async (client: ClientAttributes, message: Message, args: string[]) => snusbase_discord_messages(args[0], 'hash', message, 'tools/hash-lookup')
};
