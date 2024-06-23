import { verify_request } from './Requests/Verify_Request';
import { send_request } from './Requests/Send_Request';

export async function get_output_snusbase(url: string, body: object) {
    const json = await send_request(url, body);
    const response = verify_request(json);

    if (typeof response === 'string') {
        return response;
    } else {
        if (JSON.stringify(response)) {
            return "Aucune information n'a été retrouvée lors de la recherche.";
        }
        return `\`\`\`json\n${JSON.stringify(response.results, null, 2)}\`\`\``;
    }
}
