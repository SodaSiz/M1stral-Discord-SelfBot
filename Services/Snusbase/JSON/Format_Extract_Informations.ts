import type { ExtractedInfo, FieldConfig } from "../../../Types/Snusbase";

export function formatExtractedInfo(
  extractedInfo: ExtractedInfo,
  fieldConfig: FieldConfig
): string {
  let formattedText = "";

  for (const field in fieldConfig) {
    const fieldInfo = fieldConfig[field];
    const fieldName = fieldInfo.label;
    const valuesMap = extractedInfo[field];

    if (!valuesMap || valuesMap.size === 0) {
      continue; // Skip if no values
    }

    let listItems: string[] = [];
    valuesMap.forEach((entries) => {
      entries.forEach(({ value, sources }) => {
        if (sources.length > 1) {
          listItems.push(`${value} (${sources.join(", ")})`);
        } else {
          listItems.push(value);
        }
      });
    });

    formattedText += `**${fieldName}:** ${listItems.join(", ")}\n`;
  }

  return formattedText;
}
