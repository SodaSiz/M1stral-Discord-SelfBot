import { verify_request } from './Requests/Verify_Request';
import { send_request } from './Requests/Send_Request';
import { splitJsonMessages } from '../Discord/Split_JSON_Messages';

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