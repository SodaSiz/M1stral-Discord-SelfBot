import { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";
import { EmbedBuilder } from "../../Components/Embeds/Builder";

export default {
  name: "gayrate",
  description: "Mesure ton pourcentage d'homosexualité.",
  usage: "<Utilisateur (par défaut : auteur de la commande)>",
  run: (client: ClientAttributes, message: Message) => {
    const user = message.mentions.users.first() || message.author;

    // Faire un pourcentage de 0 à 100 aléatoire et afficher une barre de 10 emojis
    const percentage = Math.floor(Math.random() * 100);
    let bar = "";
    for (let i = 0; i < percentage / 10; i++) {
      bar += "🏳️‍🌈";
    }
    for (let i = percentage / 10; i < 10; i++) {
      bar += "⬛";
    }

    const embed = new EmbedBuilder.Default({
      title: "Gay Rate",
      description: `${user.username} est homosexuel à ${bar} ${percentage}% !`,
    });
    return message.channel.send({ content: embed.toString() });
  },
};
