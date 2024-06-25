import { Message } from 'discord.js-selfbot-v13';
import { get_output_snusbase } from '../../Snusbase/Core/Get_Output';
import { snusbase_types, other_url } from '../../Utils/Lists/Snusbase_Types.json'
import { prefix } from '../../Utils/Misc/Settings.json';
import type { ClientAttributes } from '../../Types/Client';

export default {
    name: 'global_search',
    description: 'Obtenir des informations avec une recherche global',
    usage: '(Type de recherche (email, hash-lookup, password, ip, ip-whois, username, name) <Recherche>)',
    args: true,
    run: async (client: ClientAttributes, message: Message, args: string[]) => {
        if (!snusbase_types.includes(args[0].toLowerCase()) && !other_url.includes(args[0]))
            return message.channel.send(`**Le type de catégorie ${args[0]} n'existe pas !**\nPour plus d'information sur la commande, tappez \`${prefix}help global_search\``);
        if (!args[1].length)
            return message.channel.send(`**Vous devez spécifier une recherche pour utiliser la commande !**\nPour plus d'information sur la commande, tappez\`${prefix}help global_search\``);
        if (args[0].toLowerCase() == "name" && !args[2])
            return message.channel.send(`**Vous devez spécifier une recherche avec un nom ET prénom pour utiliser la commande name !**`);

        if (other_url.includes(args[0])) {
            var results = await get_output_snusbase(`tools/${args[0]}`, { terms: [args[1].toLowerCase()]});
        } else {
            if (args[0].toLowerCase() == 'name')
                var results = await get_output_snusbase('data/search', { terms: [`${args[1]} ${args[2]}`], types: [args[0].toLowerCase()], wildcard: false });
            else
                var results = await get_output_snusbase('data/search', { terms: [args[1].toLowerCase()], types: [args[0]], wildcard: false });
        }
        for (const result of results) {
            await message.channel.send(result);
        }
    },
};
