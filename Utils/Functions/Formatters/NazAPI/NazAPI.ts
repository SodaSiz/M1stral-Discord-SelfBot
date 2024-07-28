import type { JsonObject } from "../../../../Types/JSONObject";

export function formatNazAPIResponse(data: JsonObject): string {
  let formattedText = `**Nombre de résultats:** ${data.NumOfResults}\n`;
  formattedText += `**Nombre de bases de données:** ${data.NumOfDatabase}\n`;
  formattedText += `**Temps de recherche:** ${data["search time"]} secondes\n`;
  formattedText += `**Prix:** ${data.price} crédits\n\n`;

  const list = data.List;
  for (const source in list) {
    const sourceData = list[source];
    formattedText += `**Source:** ${source}\n`;
    formattedText += `**Fuite d'information:** \`${sourceData.InfoLeak}\`\n`;
    formattedText += `**Nombre de résultats:** ${sourceData.NumOfResults}\n\n`;

    sourceData.Data.forEach((entry: JsonObject, index: number) => {
      formattedText += `**Résultat ${index + 1}:**\n`;
      for (const key in entry) {
        formattedText += `- **${key}:** ${entry[key]}\n`;
      }
      formattedText += '\n';
    });

    formattedText += '\n';
  }

  return formattedText;
}
