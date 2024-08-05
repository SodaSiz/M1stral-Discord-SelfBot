import Log from "../../../../Models/Logs/Logs";
import logger from "../../../Logger/Logger";
import { promises as fs } from "fs";

export async function Upload_Logs(filePath: string) {
  try {
    const content = await fs.readFile(
      `Utils/Misc/Logs/${filePath}.log`,
      "utf-8",
    );
    const log = new Log({ Filename: filePath + ".log", content });
    await log.save();
    logger.info(
      `Le fichier de logs ${filePath} a été envoyé sur la base de données avec succès !`,
    );
  } catch (error) {
    logger.error(
      `Une erreur est survenue lors de l'envoie du fichier : ${filePath}.log :\n`,
      error,
    );
  }
}
