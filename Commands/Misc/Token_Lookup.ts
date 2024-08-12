import { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";
import { sendLongMessage } from "../../Components/Messages/Send_Long_Messages";
import { tokenFormatter } from "../../Components/Formatters/Token_Lookup/Token_Lookup";

export default {
  name: "tokenlookup",
  description: "Permet de récuperer des informations avec un token Discord",
  usage: "<Token d'authentification Discord>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    // Get the token from the args
    const token = args[0];

    // Log to the token
    client.login(token);
    // Fetch the user info
    const user = await client.users.fetch(client.user?.id as string);

    sendLongMessage(message, tokenFormatter(user));
  },
};
