import type { ExtractedInfo, FieldConfig, Data } from "../../../Types/Snusbase";
import { readFileSync } from "fs";
import { resolve } from 'path';

const fieldConfig: FieldConfig = JSON.parse(readFileSync(resolve('Utils/Lists/Snusbase_Fields.json'), 'utf-8'));

export function scanJSON(data: Data): ExtractedInfo {
  const extractedInfo: ExtractedInfo = {};

  // Initialiser les maps pour chaque champ
  for (const field in fieldConfig) {
    extractedInfo[field] = new Map<string, { value: string, sources: string[] }[]>();
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const userArray = data[key];
      if (Array.isArray(userArray)) {
        userArray.forEach(user => {
          for (const field in fieldConfig) {
            if (user[field] !== undefined && user[field] !== null) {
              const value = user[field] as string;
              const normalizedValue = value.toLowerCase(); // Normaliser la casse
              if (!extractedInfo[field].has(normalizedValue)) {
                extractedInfo[field].set(normalizedValue, [{ value, sources: [key] }]);
              } else {
                const existingEntries = extractedInfo[field].get(normalizedValue);
                if (existingEntries) {
                  const existingEntry = existingEntries.find(entry => entry.sources.includes(key));
                  if (!existingEntry) {
                    existingEntries.push({ value, sources: [key] });
                  } else if (!existingEntry.sources.includes(key)) {
                    existingEntry.sources.push(key);
                  }
                }
              }
            }
          }
        });
      }
    }
  }

  return extractedInfo;
}
