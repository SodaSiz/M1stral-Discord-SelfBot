import {
  prefix,
  auto_delete_message,
  admin_id,
  users_id,
} from "../../Utils/Misc/Settings/Bot/Bot.json";
import type { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";
import "dotenv/config";

export default {
  name: "messageCreate",
  once: false,
  execute(client: ClientAttributes, message: Message) {
    if (
      admin_id.includes(message.author.id as unknown as any) ||
      users_id.includes(message.author.id as unknown as any)
    )
      return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift()?.toLowerCase();

    if (!cmdName) return;

    const cmd = client.commands.get(cmdName);

    if (cmd) {
      if (cmd.admin == true && !admin_id.includes(message.author.id as any))
        return message.reply(
          "Cette commande est réservée aux utilisateurs administrateur du SelfBot.",
        );
      if (cmd.args == true && !args.length)
        return message.reply(
          `**Vous devez spécifier des arguments pour votre commande !**\nPour plus de détail, executez \`${prefix}help ${cmdName}\``,
        );
      if (auto_delete_message == true && client.user?.id == message.author.id)
        message.delete();
      cmd.run(client, message, args);
    } else
      return message.reply(
        `**Cette commande n'existe pas !**\nPour obtenir la liste des commandes, veuillez executer la commande \`${prefix}help\``,
      );
  },
};
