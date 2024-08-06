import type { JsonObject } from "../../../../Types/JSONObject";

export function tokenFormatter(user: JsonObject) {
  let formattedText = `**Nom d'utilisateur:** ${user.globalName}\n`;
  formattedText += `**Arobase:** ${user.username}\n`;
  formattedText += `**ID:** ${user.id}\n`;
  formattedText += `**Avatar:** \`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg\`\n`;
  formattedText += `${
    user.clanTag ? `**Clan (HypeSquad):** ${user.clanTag}\n` : ""
  }`;
  formattedText += `${user.email ? `**Email:** ${user.email}\n` : ""}`;
  formattedText += `${user.phone ? `**Phone:** ${user.phone}\n` : ""}`;
  formattedText += `${user.bio ? `**Bio:** ${user.bio}\n` : ""}`;
  formattedText += `${
    user.discriminator != 0
      ? `**Discriminator (Anciennement "Tag"):** ${user.discriminator}\n`
      : ""
  }`;
  formattedText += `${
    user.premiumType ? `**Niveau du premium:** ${user.premiumType}\n` : ""
  }`;
  formattedText += `${
    user.publicFlags ? `**Flags publique:** ${user.publicFlags}\n` : ""
  }`;
  formattedText += `${user.locale ? `**Locale:** ${user.locale}\n` : ""}`;
  formattedText += `${
    user.mfaEnabled ? `**MFA Enabled:** ${user.mfaEnabled}\n` : ""
  }`;
  formattedText += `${user.verified ? `**Verified:** ${user.verified}\n` : ""}`;
  formattedText += `${
    user.avatarDecoration ? `**Décoration:** ${user.avatarDecoration}\n` : ""
  }`;
  formattedText += `${user.banner ? `**Bannière:** ${user.banner}\n` : ""}`;
  formattedText += `${
    user.bannerColor
      ? `**Couleur de bannière (Hex):** ${user.bannerColor}\n`
      : ""
  }`;
  formattedText += `${
    user.accentColor
      ? `**Couleur d'accentuation (Hex):** #${user.accentColor}\n`
      : ""
  }`;
  formattedText += `**Autorisé à voir du contenu NSFW:** ${
    user.nsfwAllowed ? `oui\n` : "non\n"
  }`;
  return formattedText;
}
