import { connection } from "mongoose";
import logger from "../../../Logger/Logger";
import "dotenv/config";
import { ConnectDB } from "./Connect";
import { Watch_Logs } from "./Watch";
import { Upload_Logs } from "./Upload";
import { Logs_Files } from "../../../Lists/Logs_Files.json";
(async () => {
  await ConnectDB();
  // Exécution du script

  Watch_Logs(
    Logs_Files.map((filename: string) => {
      return `${filename}.log`;
    }),
  );

  // Garder le processus en vie pour permettre à chokidar de fonctionner
  process.stdin.resume();
})();

// Exécution du script
(async () => {
  await ConnectDB();

  await Promise.all(Logs_Files.map((file: string) => Upload_Logs(file)));
  logger.info("Les logs ont été envoyé avec succès.");

  connection.close();
})();
