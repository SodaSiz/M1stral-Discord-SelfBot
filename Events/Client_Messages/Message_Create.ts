import {
  prefix,
  auto_delete_message,
  owners_id,
  users_id,
} from "../../Utils/Misc/Settings/Bot/Bot.json";
import type { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";
import "dotenv/config";
import logger from "../../Utils/Logger/Logger";

export default {
  name: "messageCreate",
  once: false,
  execute(client: ClientAttributes, message: Message) {
    // Si le message ne commence pas par le préfixe, ne rien faire
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift()?.toLowerCase();

    if (!cmdName) return logger.info("Commande sans nom.");

    const cmd = client.commands.get(cmdName);
    if (!cmd)
      return message.reply(
        `**Cette commande n'existe pas !**\nPour obtenir la liste des commandes, veuillez executer la commande \`${prefix}help\``,
      );
    // Vérifier si l'auteur du message est un propriétaire ou un utilisateur autorisé
    if (
      !owners_id.includes(message.author.id) &&
      !users_id.includes(message.author.id)
    )
      return logger.info("Utilisateur non autorisé");

    if (cmd.admin === true && !owners_id.includes(message.author.id)) {
      logger.warn(
        `Commande exécuté par l'utilisateur refusée ( N'est pas dans la liste des membres autorisé. ) : \nUserName : ${message.author.username}\nID : ${message.author.id}`,
      );
      return message.reply(
        "Cette commande est réservée aux utilisateurs propriétaires du SelfBot.",
      );
    }
    if (cmd.args === true && !args.length) {
      logger.warn(
        `Commande sans argument spécifier exécuté par l'utilisateur : \nUserName : ${message.author.username}\nID : ${message.author.id}`,
      );
      return message.reply(
        `**Vous devez spécifier des arguments pour votre commande !**\nPour plus de détails executez \`${prefix}help ${cmdName}\``,
      );
    }
    if (auto_delete_message === true && client.user?.id === message.author.id) {
      message.delete();
    }
    logger.info(
      `Commande executé de l'utilisateur : \nUserName : ${message.author.username}\nID: ${message.author.id}`,
    );
    cmd.run(client, message, args);
  },
};
