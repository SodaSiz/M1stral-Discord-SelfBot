import {Client} from 'discord.js-selfbot-v13';
import {promisify} from 'util';
import {eventsList} from '../Lists/Events.json';
import {glob} from 'glob';
import AsciiTable from 'ascii-table';
import {basename, dirname} from 'path';

const pGlob = promisify(glob);

let table = new AsciiTable('Évenements')
table.setHeading('Nom', 'Catégorie')

export default async (client: Client) => {
  const eventFiles = await pGlob(`${process.cwd()}/Events/*/*.ts`);
  await Promise.all(eventFiles.map(async (eventFile) => {
    const {default: event} = await import(`${eventFile}`);

    const category = basename(dirname(eventFile));
    
    if (!eventsList.includes(event.name) || !event.name)
      return console.log(`\n⚠ ================\nÉvenement non chargée: ${event.name ? `\nNom mal écris\nNom entrée: ${event.name}\n` : 'Aucun nom entrée'} \nFichier --> ${eventFile}\n⚠ ================\n\n`);

    if (event.once)
      client.once(event.name, (...args) => event.execute(client, ...args));
    else
      client.on(event.name, (...args) => event.execute(client, ...args));

    // console.log(`Évenement chargé: ${event.name}`);
    table.addRow(event.name, category)
  }));
  console.log(table.toString())
}
