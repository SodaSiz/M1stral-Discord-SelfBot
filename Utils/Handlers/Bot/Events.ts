import { Client } from 'discord.js-selfbot-v13';
import { promises as fs } from 'fs';
import { basename, dirname, join } from 'path';
import AsciiTable from 'ascii-table';
import { eventsList } from '../../Constants/Events.json';

// Table pour afficher les événements
const table = new AsciiTable('Évenements');
table.setHeading('Nom', 'Catégorie');

// Fonction récursive pour lire les fichiers d'un répertoire
async function getFiles(dir: string): Promise<string[]> {
  let files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = [...files, ...(await getFiles(fullPath))];
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

export default async (client: Client) => {
  // Obtenir tous les fichiers d'événements
  const eventFiles = await getFiles(join(process.cwd(), 'Events'));

  await Promise.all(eventFiles.map(async (eventFile) => {
    // Importer le module d'événement
    const { default: event } = await import(eventFile);

    // Extraire la catégorie depuis la structure des répertoires
    const category = basename(dirname(eventFile));

    // Vérifier la validité de l'événement
    if (!eventsList.includes(event.name) || !event.name) {
      return console.log(`\n⚠ ================\nÉvenement non chargée: ${event.name ? `\nNom mal écrit\nNom entrée: ${event.name}\n` : 'Aucun nom entré'} \nFichier --> ${eventFile}\n⚠ ================\n\n`);
    }

    // Enregistrer l'événement dans le client
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }

    // Ajouter l'événement à la table
    table.addRow(event.name, category);
  }));

  // Afficher la table
  console.log(table.toString());
};

