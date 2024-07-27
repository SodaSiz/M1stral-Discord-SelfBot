import { Message } from "discord.js-selfbot-v13";

export async function sendLongMessage(message: Message, content: string) {
    const chunkSize = 2000; // Taille maximale d'un message Discord
    const numChunks = Math.ceil(content.length / chunkSize);

    for (let i = 0; i < numChunks; i++) {
        const chunk = content.slice(i * chunkSize, (i + 1) * chunkSize);
        await message.channel.send(chunk);
    }
}
