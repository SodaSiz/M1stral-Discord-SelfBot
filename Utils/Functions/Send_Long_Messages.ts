import { Message } from "discord.js-selfbot-v13";

export async function sendLongMessage(message: Message, content: string, language: string = '') {
    const wrapperLength = language ? language.length + 8 : 0; // Longueur des wrappers de code
    const chunkSize = 2000 - wrapperLength;
    const numChunks = Math.ceil(content.length / chunkSize);

    for (let i = 0; i < numChunks; i++) {
        const chunk = content.slice(i * chunkSize, (i + 1) * chunkSize);
        const wrappedChunk = language ? `\`\`\`${language}\n${chunk}\n\`\`\`` : chunk;
        await message.channel.send(wrappedChunk);
    }
}

