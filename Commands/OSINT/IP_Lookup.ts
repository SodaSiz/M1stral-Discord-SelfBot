import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import fetch from 'node-fetch';

export default {
	name: "iplookup",
	description: "Obtenir des informations sur l'adresse IP d'une personne",
	usage: "<Adresse IP>",
	args: true,
	run: async (client: ClientAttributes, message: Message, args: string[]) => {
    const response = await fetch(`http://ip-api.com/json/${args[0]}`);
    const address = await response.json();

    if (address.status === 'fail') {
      await message.channel.send("The address you provided is either blacklisted or invalid.")
        .then(m => setTimeout(() => m.delete(), 2000));
      return;
    }

    const info = `**IP Lookup**
    
    \`\`\`
    Query = ${address.query}
    Status = ${address.status}

    Country = ${address.country}
    Country Code = ${address.countryCode}
    Region name = ${address.regionName}
    Region = ${address.region}

    City = ${address.city}
    ZIP code = ${address.zip}
    Latitude / Longitude = ${address.lat} / ${address.lon}

    Timezone = ${address.timezone}

    ISP = ${address.isp}
    ORG = ${address.org}
    AS = ${address.as}
    AS name = ${address.asname}

    Reverse DNS = ${address.reverse}
    Mobile = ${address.mobile}
    Hosting = ${address.hosting}
    \`\`\``;

    await message.channel.send(info);
  }
}
