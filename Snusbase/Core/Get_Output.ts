import { verify_request } from './Requests/Verify_Request';
import { send_request } from './Requests/Send_Request';

export async function get_output_snusbase(url: string, body: object): Promise<string[]> {
    const json = await send_request(url, body);
    const response = verify_request(json);

    if (typeof response === 'string') {
        return [response];
    } else {
        if (JSON.stringify(response.results) === "{}") {
            return ["Aucune information n'a été retrouvée lors de la recherche."];
        }
        const formattedJson = JSON.stringify(response.results, null, 2);
        return splitJsonMessages(formattedJson);
    }
}

function splitJsonMessages(jsonString: string): string[] {
    const messages: string[] = [];
    let currentMessage = '```json\n';
    let currentSize = currentMessage.length;
    const lines = jsonString.split('\n');

    for (const line of lines) {
        // Si ajouter la ligne dépasse la limite, on termine le message actuel et en commence un nouveau
        if ((currentSize + line.length + 1 + 3) > 2000) { // 1 pour '\n', 3 pour '```'
            currentMessage += '```';
            messages.push(currentMessage);
            currentMessage = '```json\n' + line + '\n';
            currentSize = currentMessage.length;
        } else {
            // Ajoute la ligne au message actuel si cela ne dépasse pas la limite de caractères
            currentMessage += line + '\n';
            currentSize += line.length + 1;
        }
    }

    // Ajoute le dernier message restant
    if (!currentMessage.endsWith('```')) {
        currentMessage += '```';
        messages.push(currentMessage);
    }

    return messages;
}
