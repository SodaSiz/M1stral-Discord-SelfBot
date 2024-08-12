import { Watch_Logs } from "./Watch";
import { connection } from "mongoose";
import { ConnectDB } from "./Connect";
import { Upload_Logs } from "./Upload";
import { Logs_Files } from "../../../Constants/Logs_Files.json";
import logger from "../../../../Components/Logger/Logger";

export async function Logs_Connection() {
  await ConnectDB();

  Watch_Logs(
    Logs_Files.map((filename: string) => {
      return `${filename}.log`;
    }),
  );

  // Garder le processus en vie pour permettre à chokidar de fonctionner
  process.stdin.resume();

  await Promise.all(Logs_Files.map((file: string) => Upload_Logs(file)));
  logger.info("Les logs ont été envoyé avec succès.");

  connection.close();
}
