import { readFileSync } from "fs";
import { resolve, join as pathjoin } from "path";
import { FieldConfig, Data } from "../../../../Types/Snusbase";
import { scanJSON } from "./JSON/Scan";
import { formatExtractedInfo } from "./JSON/Format_Extract_Informations";
import { send_request } from "../../../../Snusbase/Core/Requests/Send_Request";
import { Message, MessageAttachment } from "discord.js-selfbot-v13";
import { Snusbase_Settings } from "../../../Misc/Settings/Snusbase/Snusbase.json";
import { make_json_snusbase } from "./JSON/Make_JSON_File";
import { sendLongMessage } from "../../Send_Long_Messages";
import { embed_error } from "../../Embeds/Error";
import { embed } from "../../Embeds/Default";
import logger from "../../../Logger/Logger";

const fieldConfig: FieldConfig = JSON.parse(
  readFileSync(resolve("Utils/Lists/Snusbase_Fields.json"), "utf-8")
);

export async function snusbase_discord_messages(
  search: string,
  type: string[],
  message: Message,
  save_subfolder: string = "global_search",
  api_url = "data/search"
) {
  let jsonData: { status: string; results: Data; errors: string };

  if (api_url == "tools/hash") {
    jsonData = await send_request(api_url, {
      types: "tools/hash",
      terms: [search],
    });
  } else {
    jsonData = await send_request(api_url, {
      types: type,
      terms: [search],
      wildcard: false,
    });
  }

  // Vérifier si une erreur a été rencontrée dans le résultat de l'API
  if (jsonData.errors) {
    return embed_error(
      message,
      `Une erreur est survenue lors de la récupération des données dans la base de données de Snusbase.\nDétails :
${jsonData.errors[0]}`
    );
  }

  // Accéder à la clé 'results' dans jsonData

  if (!jsonData.results)
    return embed_error(message, "Erreur lors de la récupération des données");

  const extractedInfo = scanJSON(jsonData.results);

  // Utiliser la fonction formatExtractedInfo pour formater le texte
  const formattedInfo = formatExtractedInfo(extractedInfo, fieldConfig);
  if (!formattedInfo.trim().length)
    return embed(
      message,
      "Aucune information trouvée.",
      `La recherche de ${search} n'a donné aucun résultat.`
    );

  sendLongMessage(message, formattedInfo);
  if (
    Snusbase_Settings.send_output_json &&
    !Snusbase_Settings.save_output_json
  ) {
    return logger.warn(
      "Vous ne pouvez pas envoyer le fichier avec les résultats Snusbase sans les sauvegarder !\nVeuillez changer la configuration pour autoriser la sauvegarde de vos requêtes ou refuser l'envoi du fichier."
    );
  }

  if (!Snusbase_Settings.send_output_json) return;
  if (!Snusbase_Settings.save_output_json) return;

  await make_json_snusbase(
    process.env.OUTPUT_RESULTS_DIRECTORY || "Snusbase/Results",
    `${save_subfolder}/${search}`,
    jsonData
  ); // Créer un fichier JSON avec les informations formatées

  // Envoyer le fichier JSON en tant qu'attachement sur Discord
  const attachmentPath = pathjoin(
    process.env.OUTPUT_RESULTS_DIRECTORY || "Snusbase/Results",
    save_subfolder,
    `${search}.json`
  );
  const attachment = new MessageAttachment(attachmentPath);
  return await message.channel.send({ files: [attachment] });
}
