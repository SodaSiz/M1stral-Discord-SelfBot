import { Message } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from '../../Types/Client';

export default {
  name: 'serverinfo',
  description: 'Affiche des informations concernant un serveur',
  usage: '(Identifiant du serveur)',
  run: async (client: ClientAttributes, message: Message) => {
    // Extraire l'identifiant du serveur des arguments de la commande
    const args = message.content.split(' ').slice(1);
    const guildId = args[0] || message.guild?.id;

    // Vérifier si l'identifiant du serveur est défini
    if (!guildId) return;
    // Récupérer le serveur (guild) par son identifiant
    const guild = client.guilds.cache.get(guildId);
    
    // Vérifier si le serveur existe
    if (!guild) 
      return message.channel.send('Le serveur avec cet identifiant n\'a pas été trouvé.');

    // Créer manuellement le message avec les informations du serveur
    const serverInfo = `
**Informations du serveur: ${guild.name}**
- **Nom:** ${guild.name}
- **ID:** ${guild.id}
- **Propriétaire:** <@${guild.ownerId}>
- **Membres:** ${guild.memberCount}
- **Rôles:** ${guild.roles.cache.size}
- **Canaux:** ${guild.channels.cache.size}
    `;

    // Envoyer le message dans le canal où la commande a été exécutée
    return message.channel.send(serverInfo);
  }
}

