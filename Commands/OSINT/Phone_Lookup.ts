import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import fetch from 'node-fetch';
import twilio from 'twilio';
import 'dotenv/config';

export default {
  name: "phonelookup",
  description: "Obtenir des informations avec un numéro de téléphone.",
  usage: "<Numéro de téléphone>",
  args: true,
  run: async (client: ClientAttributes, message: Message, args: string[]) => {
    const phoneNumber: string = args[0];
    if (!phoneNumber.startsWith('+'))
      return message.channel.send('**Erreur**\n\nVous deviez spécifier un numéro commençant par un +<Code national>.\n\nExemple: \n``0612345678 -> +33612345678 ``')

    const numLookupApiKey: string = process.env.NUM_LOOKUP_API_TOKEN as string;
    const twilioAuthToken: string = process.env.TWILIO_AUTH_TOKEN as string;
    const twilioAccountSid: string = process.env.TWILIO_ACCOUNT_SID as string;

    if (!numLookupApiKey && (!twilioAuthToken || !twilioAccountSid)) {
      return message.channel.send("**Erreur**\n\nPour utiliser cette commande, vous devez renseigner votre token de l'api numlookupapi ou votre SID Twilio ainsi que le token.");
    }

    if (numLookupApiKey) {
        const response = await fetch(`https://api.numlookupapi.com/v1/validate/${phoneNumber}`, {
          method: 'GET',
          headers: {
            'apikey': numLookupApiKey
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la recherche du numéro: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.valid == false)
          return message.channel.send(`**Erreur**\n\nle numéro reseigné (${phoneNumber}) est invalide !`)

        const info = `**Phone Lookup**

- Numéro: \`${data.number}\`
- Format local: \`${data.local_format}\`
- Format international: \`${data.international_format}\`
- Préfixe du pays: \`${data.country_prefix}\`
- Code du pays: \`${data.country_code}\`
- Nom du pays: \`${data.country_name}\`
- Localisation: \`${data.location}\`
- Opérateur: \`${data.carrier}\`
- Type de ligne: \`${data.line_type}\`
`;

        return message.channel.send(info);
    } else if (twilioAuthToken && twilioAccountSid) {
        const twilioclient = twilio(twilioAccountSid, twilioAuthToken);
        // **TODO**: Convertir des 06 en +336 automatiquement ou forcer à inclure en +336
        const phoneNumberInfo = await twilioclient.lookups.v2
          .phoneNumbers(phoneNumber)
          .fetch();

        const info = `**Phone Lookup**

- Code d'appel du pays: \`${phoneNumberInfo.callingCountryCode}\`
- Code du pays: \`${phoneNumberInfo.countryCode}\`
- Formattage national: \`${phoneNumberInfo.nationalFormat}\`
- Caller name: \`${phoneNumberInfo.callerName}\`
${phoneNumberInfo.simSwap ? `- Sim Swap: \`${phoneNumberInfo.simSwap}\`` : ''}
- Call Forwarding: \`${phoneNumberInfo.callForwarding}\`
- Status de la ligne: \`${phoneNumberInfo.lineStatus}\`
- Line Type Intelligente: \`${phoneNumberInfo.lineTypeIntelligence}\`
- Numéro réassigné: \`${phoneNumberInfo.reassignedNumber}\`
- Identité identique: \`${phoneNumberInfo.identityMatch}\`
- SMS identifié en tant que SPAM: \`${phoneNumberInfo.smsPumpingRisk}\`
- Score de qualité: \`${phoneNumberInfo.phoneNumberQualityScore}\`
- Informations Préentrée: \`${phoneNumberInfo.preFill}\`
`;

        return message.channel.send(info);
    }
  }
}
