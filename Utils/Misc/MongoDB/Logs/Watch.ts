import { Upload_Logs } from "./Upload";
import chokidar from "chokidar";

export function Watch_Logs(logFiles: string[]) {
  const watcher = chokidar.watch(logFiles, {
    persistent: true,
  });

  watcher
    .on("change", async (filePath: string) => {
      console.log(`${filePath} has been changed`);
      await Upload_Logs(filePath);
    })
    .on("error", (error) => {
      console.error(`Watcher error: ${error}`);
    });
}
