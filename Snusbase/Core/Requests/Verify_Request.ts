import {JsonObject} from '../../../Types/JSONObject';

export function verify_request(json: JsonObject) {
	if (json.errors)
		return `**Une erreur est survenue lors de la récupération des données dans la base de données de Snusbase.
Vous avez probablement excedé le quota d'utilisation pour votre abonnement.**
Détails :
${json.errors[0]}`
	else return json;
}