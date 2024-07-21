import type { ClientAttributes } from '../../../Types/Client';
import type { Command } from '../../../Types/Command'
import { promisify } from 'util';
import { glob } from 'glob';
import path from 'path';
import AsciiTable from 'ascii-table';

const pGlob = promisify(glob);

let table = new AsciiTable('Commandes');
table.setHeading('Nom', 'Catégorie')

export default async (client: ClientAttributes) => {

  const cmdFiles = await pGlob(`${process.cwd()}/Commands/*/*.ts`);

  await Promise.all(cmdFiles.map(async (cmdFile) => {
    const { default: cmd } = await import(cmdFile) as { default: Command };

    // Extract the category from the directory structure
    const category = path.basename(path.dirname(cmdFile));

    // Set the category for the command
    cmd.category = category;

    if (!cmd.name || (!cmd.description && cmd.type !== 'USER'))
      return console.log(`\n⚠ ================\nCommande non chargée: ${!cmd.name ? 'Pas de nom' : 'Pas de description'} \nFichier --> ${cmdFile}\n⚠ ================\n\n`);

    if (cmd.args === true && !cmd.usage)
      return console.log(`\n⚠ ================\nCommande non chargée: Requière des arguments mais ne précise pas leurs usages \nFichier --> ${cmdFile}\n⚠ ================\n\n`);

    client.commands.set(cmd.name, cmd);
    // console.log(`Commande chargée: ${cmd.name} (Category: ${category})`);
    table.addRow(cmd.name, category)
  }));
  console.log(table.toString())
};
