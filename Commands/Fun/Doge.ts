import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";

export default {
  name: "doge",
  description: "Doge meme generator",
  args: true,
  usage: "doge (top text) ; (bottom text)",
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    let text: string[];
    if (message.content.slice(6).includes(';')) {
      text = args.join(' ').replace(/ /g, '+').split(';')
    } else {
      text = [args.join(' ').replace(/ /g, '+'), ""]
    }

    message.channel.send(`https://apimeme.com/meme?meme=Advice-Doge&top=${text[0]}${text[1] ? `&bottom=${text[1]}` : ""}`)
  }
}
