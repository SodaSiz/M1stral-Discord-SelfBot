import type { JsonObject } from "../../../Types/JSONObject";

function formatValue(value: any): string {
  if (value === true) return "oui";
  if (value === false) return "non";
  if (value === null) return "aucun(e)";
  return String(value);
}

export function tokenFormatter(user: JsonObject) {
  const fields = [
    { name: "Nom d'utilisateur", value: user.globalName },
    { name: "Arobase", value: user.username },
    { name: "ID", value: user.id },
    {
      name: "Avatar",
      value: user.avatar
        ? `\`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg\``
        : undefined,
    },
    { name: "Clan (HypeSquad)", value: user.clanTag },
    { name: "Email", value: user.email },
    { name: "EMail verifié", value: user.verified },
    { name: "Phone", value: user.phone },
    { name: "Bio", value: user.bio },
    { name: 'Discriminator (Anciennement "Tag")', value: user.discriminator },
    { name: "Niveau du premium", value: user.premiumType },
    { name: "Flags publique", value: user.publicFlags },
    { name: "Locale", value: user.locale },
    { name: "Double authentification activée", value: user.mfaEnabled },
    { name: "Décoration", value: user.avatarDecoration },
    { name: "Bannière", value: user.banner },
    { name: "Couleur de bannière (Hex)", value: user.bannerColor },
    {
      name: "Couleur d'accentuation (Hex)",
      value: user.accentColor ? `#${user.accentColor}` : undefined,
    },
    { name: "Autorisé à voir du contenu NSFW", value: user.nsfwAllowed },
  ];

  return fields
    .filter((field) => field.value !== undefined)
    .map((field) => `**${field.name}:** ${formatValue(field.value)}`)
    .join("\n");
}
