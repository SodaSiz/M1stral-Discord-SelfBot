import { ClientAttributes } from "../../Types/Client";
import { Message } from "discord.js-selfbot-v13";

export default {
  name: "flood",
  usage: "<Message>",
  description: "Flood une séquence de message (Risque de bannissement)",
  args: true,
  run: (client: ClientAttributes, message: Message, args: string[]) => {
    let i = 0;
    while (true) {
      message.channel.send(args[i]);
      i++;
      if (i >= args.length) {
        break;
      }
    }
  },
};
