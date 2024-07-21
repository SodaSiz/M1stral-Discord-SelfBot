import { Message } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from '../../Types/Client';

export default {
  name: 'userinfo',
  description: 'Affiche des informations concernant un utilisateur',
  usage: '(Mention, ID ou nom d\'utilisateur)',
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Si aucun argument n'est fourni, utiliser l'auteur du message
    const query = args.length > 0 ? args[0] : message.author.id;

    // Vérifier si une mention est fournie
    const mention = message.mentions.users.first();

    // Chercher l'utilisateur par mention, ID ou nom d'utilisateur
    let user = mention || client.users.cache.get(query) || client.users.cache.find(u => u.tag === query);

    // Si l'utilisateur n'est pas trouvé dans le cache, essayer de le chercher par ID
    if (!user && !mention && !isNaN(Number(query))) {
      try {
        user = await client.users.fetch(query);
      } catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      }
    }

    // Vérifier si l'utilisateur existe
    if (!user) {
      return message.channel.send('Utilisateur non trouvé. Veuillez fournir une mention, un ID ou un nom d\'utilisateur valide.');
    }

    // Récupérer les informations du membre dans le serveur si possible
    const member = message.guild?.members.cache.get(user.id);

    // Créer manuellement le message avec les informations de l'utilisateur
    const userInfo = `
**Informations de l'utilisateur: ${user.tag}**
- **Nom d'utilisateur:** ${user.username}
- **ID:** ${user.id}
- **Discriminateur:** ${user.discriminator}
- **Bot:** ${user.bot ? 'Oui' : 'Non'}
- **Créé le:** ${user.createdAt.toDateString()}
${member ? `
**Informations sur le serveur:**
- **Surnom:** ${member.nickname || 'Aucun'}
- **Rejoint le:** ${member.joinedAt?.toDateString()}
- **Rôles:** ${member.roles.cache.map(role => role.name).join(', ')}
` : ''}
    `;

    // Envoyer le message dans le canal où la commande a été exécutée
    return message.channel.send(userInfo);
  }
}

