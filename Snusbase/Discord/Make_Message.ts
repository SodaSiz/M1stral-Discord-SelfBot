import { Message, MessageAttachment } from "discord.js-selfbot-v13";
import { get_output_snusbase } from "../Core/Get_Output";
import { make_json_snusbase } from "../Core/Requests/Make_JSON_File";
import { splitJsonMessages } from "./Split_JSON_Messages"; // Assurez-vous que le chemin est correct
import { JsonObject } from "../../Types/JSONObject";
import { Snusbase_Settings } from "../../Utils/Misc/Settings.json";
import { log_figlet } from "../../Utils/Misc/ASCII/Figlet";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Charger les variables d'environnement

const outputDir = process.env.OUTPUT_RESULTS_DIRECTORY || "Snusbase/Results"; // Répertoire de sortie par défaut si non défini

export async function snusbase_discord_messages(
	search: string,
	type: string,
	message: Message,
	other_api: string = "",
) {
	let results: string[];
	switch (other_api) {
		case "tools/hash-lookup": {
			results = await get_output_snusbase(other_api, {
				terms: [search],
				types: [type],
			});
			break;
		}

		case "tools/ip-whois": {
			results = await get_output_snusbase("tools/ip-whois", { terms: [search] });
			break;
		}

		default: {
			results = await get_output_snusbase("data/search", {
				terms: [search],
				types: [type],
				wildcard: false,
			});
			break;
		}
	}

	// Vérifier s'il y a des résultats
	if (
		results[0].startsWith("Aucune information") ||
		results[0].startsWith("**Une erreur")
	) {
		return await message.channel.send(
			results[0] || "Aucune information trouvée.",
		);
	}

	const combinedResult: JsonObject = {};

	// Combiner tous les éléments JSON du tableau results

	// Utiliser splitJsonMessages pour diviser les messages longs
	for (const result of results) {
		const splitMessages = splitJsonMessages(result, 11);
		for (const msg of splitMessages) {
			await message.channel.send(`\`\`\`json\n${msg}\n\`\`\``);
		}
	}

	if (
		Snusbase_Settings.send_output_json &&
		!Snusbase_Settings.save_output_json
	) {
		log_figlet("Warning");
		return console.error(
			"Vous ne pouvez pas envoyer le fichier avec les résultats Snusbase sans les sauvegarder !\nVeuillez changer la configuration pour autoriser la sauvegarde de vos requêtes ou refuser l'envoi du fichier.",
		);
	}

	if (!Snusbase_Settings.save_output_json) return;

	// Créer un fichier JSON avec les résultats combinés
	await make_json_snusbase(outputDir, `${type}/${search}`, combinedResult);

	if (!Snusbase_Settings.send_output_json) return;

	// Envoyer le fichier JSON en tant qu'attachement sur Discord
	const attachmentPath = path.join(outputDir, type, `${search}.json`);
	const attachment = new MessageAttachment(attachmentPath);
	return await message.channel.send({ files: [attachment] });
}
