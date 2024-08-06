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

    // Vérifier si l'utilisateur est autorisé avant toute autre action
    if (
      !owners_id.includes(message.author.id) &&
      !users_id.includes(message.author.id)
    ) {
      logger.info(
        `Tentative d'utilisation non autorisée par : \nUserName : ${message.author.username}\nID : ${message.author.id}`
      );
      return; // Arrêter l'exécution ici si l'utilisateur n'est pas autorisé
    }

    // À partir d'ici, seuls les utilisateurs autorisés continuent

    if (!cmdName) {
      return logger.info(
        `Commande sans nom exécutée par l'utilisateur : \nUserName : ${message.author.username}\nID : ${message.author.id}`
      );
    }

    const cmd = client.commands.get(cmdName);
    if (!cmd) {
      return message.reply(
        `**Cette commande n'existe pas !**\nPour obtenir la liste des commandes, veuillez exécuter la commande \`${prefix}help\``
      );
    }

    if (cmd.admin === true && !owners_id.includes(message.author.id)) {
      logger.warn(
        `Commande admin exécutée par un utilisateur non propriétaire : \nUserName : ${message.author.username}\nID : ${message.author.id}`
      );
      return message.reply(
        "Cette commande est réservée aux utilisateurs propriétaires du SelfBot."
      );
    }

    if (cmd.args === true && !args.length) {
      logger.warn(
        `Commande sans argument spécifié exécutée par l'utilisateur : \nUserName : ${message.author.username}\nID : ${message.author.id}`
      );
      return message.reply(
        `**Vous devez spécifier des arguments pour votre commande !**\nPour plus de détails exécutez \`${prefix}help ${cmdName}\``
      );
    }

    if (auto_delete_message === true && client.user?.id === message.author.id) {
      message.delete();
    }

    logger.info(
      `Commande exécutée par l'utilisateur : \nUserName : ${message.author.username}\nID: ${message.author.id}`
    );
    cmd.run(client, message, args);
  },
};
