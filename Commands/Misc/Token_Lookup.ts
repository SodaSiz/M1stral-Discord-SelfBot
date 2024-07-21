import fetch from 'node-fetch';
import { ClientAttributes } from '../../Types/Client';
import { Message } from 'discord.js-selfbot-v13';

class DiscordTokenInfo {
  token: string;
  headers: { Authorization: string };

  constructor(token: string) {
    this.token = token;
    try {
      this.headers = { Authorization: `Bot ${this.token}` };
    } catch (err) {
      this.headers = { Authorization: `Bearer ${this.token}` };
    }
  }

  async getUserInfo() {
    return this.fetchData('https://discord.com/api/v10/users/@me');
  }

  async getGuilds() {
    return this.fetchData('https://discord.com/api/v10/users/@me/guilds');
  }

  async getDMs() {
    return this.fetchData('https://discord.com/api/v10/users/@me/channels');
  }

  private async fetchData(url: string) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
      return null;
    }
  }
}

export default {
  name: "tokenlookup",
  description: "Permet de récuperer des informations avec un token Discord",
  usage: "<Token d'authentification Discord>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    const token = args[0];
    const discordInfo = new DiscordTokenInfo(token);

    const userInfo = await discordInfo.getUserInfo();
    console.log('User Info:', userInfo);

    const guilds = await discordInfo.getGuilds();
    console.log('Guilds:', guilds);

    const dms = await discordInfo.getDMs();
    console.log('DMs:', dms);
  }
}
