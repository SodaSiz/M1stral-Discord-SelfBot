import {Client, Collection} from 'discord.js-selfbot-v13';
import type {ClientAttributes} from './Types/Client';
import 'dotenv/config';
import {promises} from 'fs';
import {log_figlet} from './Utils/Misc/ASCII/Figlet'

// Lecture du fichier de manière asynchrone
promises.readFile('./Utils/Misc/ASCII/startup.txt', 'utf8')
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur lors de la lecture du fichier :", error);
    });

const client: ClientAttributes = new Client() as ClientAttributes;

client.commands = new Collection();

const loadHandlers = async () => {
  const handlers = ["Commands", "Events"];
  await Promise.all(handlers.map(async (handler) => {
    const module = await import(`./Utils/Handlers/${handler}`);
    module.default(client);
  }));
};

process.on('exit', (code) => {console.log(log_figlet('Fin de tache...'), `Le processus s'est arrêté avec le code ${code}`)});
process.on('uncaughtException', (err, origin) => {console.log(log_figlet('Oops...'), `UNCAUGHT_EXCEPTION: ERROR:\n${err}\n\nORIGIN:\n${origin}`);});
process.on('unhandledRejection', (promise, reason) => {console.log(log_figlet('Oops...'), `UNHANDLED_REJECTION: REASON: \n${reason}\n\nPROMISE:\n${promise}`)});
process.on('warning', (...args) => {console.log(log_figlet('Warning !'), ...args)});

loadHandlers().then(() => client.login(process.env.TOKEN));
