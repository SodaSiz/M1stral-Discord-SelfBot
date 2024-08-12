import { Message } from "discord.js-selfbot-v13";

export async function sendLongMessage(
  message: Message,
  content: string,
  language: string = "",
) {
  const wrapperLength = language ? language.length + 8 : 0; // Longueur des wrappers de code
  const chunkSize = 2000 - wrapperLength;

  // Diviser le contenu en lignes
  const lines = content.split("\n");
  let currentChunk = "";

  for (const line of lines) {
    // Vérifiez si ajouter cette ligne au chunk actuel dépasse la taille maximale
    if (currentChunk.length + line.length + 1 > chunkSize) {
      // Si oui, envoyez le chunk actuel
      const wrappedChunk = language
        ? `\`\`\`${language}\n${currentChunk}\n\`\`\``
        : currentChunk;
      await message.channel.send(wrappedChunk);
      currentChunk = ""; // Réinitialisez le chunk
    }

    // Ajoutez la ligne au chunk actuel
    if (currentChunk.length > 0) {
      currentChunk += "\n";
    }
    currentChunk += line;
  }

  // Envoyez le dernier chunk s'il reste des lignes non envoyées
  if (currentChunk.length > 0) {
    const wrappedChunk = language
      ? `\`\`\`${language}\n${currentChunk}\n\`\`\``
      : currentChunk;
    await message.channel.send(wrappedChunk);
  }
}
