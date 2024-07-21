import type { ClientAttributes } from '../../../Types/Client';
import type { Command } from '../../../Types/Command';
import { promises as fs } from 'fs';
import path from 'path';
import AsciiTable from 'ascii-table';

const table = new AsciiTable('Commandes');
table.setHeading('Nom', 'Catégorie');

// Fonction récursive pour lire les fichiers d'un répertoire
async function getFiles(dir: string): Promise<string[]> {
  let files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = [...files, ...(await getFiles(fullPath))];
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

export default async (client: ClientAttributes) => {
  // Obtenir tous les fichiers de commandes
  const cmdFiles = await getFiles(`${process.cwd()}/Commands`);

  await Promise.all(cmdFiles.map(async (cmdFile) => {
    const { default: cmd } = await import(cmdFile) as { default: Command };

    // Extraire la catégorie depuis la structure des répertoires
    const category = path.basename(path.dirname(cmdFile));

    // Définir la catégorie pour la commande
    cmd.category = category;

    if (!cmd.name || (!cmd.description && cmd.type !== 'USER'))
      return console.log(`\n⚠ ================\nCommande non chargée: ${!cmd.name ? 'Pas de nom' : 'Pas de description'} \nFichier --> ${cmdFile}\n⚠ ================\n\n`);

    if (cmd.args === true && !cmd.usage)
      return console.log(`\n⚠ ================\nCommande non chargée: Requière des arguments mais ne précise pas leurs usages \nFichier --> ${cmdFile}\n⚠ ================\n\n`);

    client.commands.set(cmd.name, cmd);
    table.addRow(cmd.name, category);
  }));

  console.log(table.toString());
};

