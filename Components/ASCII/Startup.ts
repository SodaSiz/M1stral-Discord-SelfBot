import { promises } from "fs";
import logger from "../Logger/Logger";

// Lecture du fichier de manière asynchrone
export const readStartupFile = async () => {
  try {
    const data = await promises.readFile(
      process.cwd() + "/user-data/ASCII/startup.txt",
      "utf8"
    );
    console.log(data);
  } catch (error) {
    logger.error("Erreur lors de la lecture du fichier :", error);
  }
};
