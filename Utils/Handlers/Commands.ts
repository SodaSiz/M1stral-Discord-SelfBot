import type { ClientAttributes } from '../../Types/Client';
import type { Command } from '../../Types/Command'
import { promisify } from 'util';
import { glob } from 'glob';
import path from 'path';

const pGlob = promisify(glob);

export default async (client: ClientAttributes) => {
  const cmdFiles = await pGlob(`${process.cwd()}/Commands/*/*.ts`);

  await Promise.all(cmdFiles.map(async (cmdFile) => {
    const { default: cmd } = await import(cmdFile) as { default: Command };

    // Extract the category from the directory structure
    const category = path.basename(path.dirname(cmdFile));

    // Set the category for the command
    cmd.category = category;

    if (!cmd.name || (!cmd.description && cmd.type !== 'USER')) {
      return console.log(`\n⚠ ================\nCommande non chargée: ${!cmd.name ? 'Pas de nom' : 'Pas de description'} \nFichier --> ${cmdFile}\n⚠ ================\n\n`);
    }

    client.commands.set(cmd.name, cmd);
    console.log(`Commande chargée: ${cmd.name} (Category: ${category})`);
  }));
};
