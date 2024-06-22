import {Client, Collection} from 'discord.js-selfbot-v13';
import type {ClientAttributes} from './Types/Client';
import 'dotenv/config';

const client: ClientAttributes = new Client() as ClientAttributes;

client.commands = new Collection();

const loadHandlers = async () => {
  const handlers = ["Commands", "Events"];
  await Promise.all(handlers.map(async (handler) => {
    const module = await import(`./Utils/Handlers/${handler}`);
    module.default(client);
  }));
};

process.on('exit', (code) => {console.log(`Le processus s'est arrêté avec le code ${code}`)});
process.on('uncaughtException', (err, origin) => {console.log(`UNCAUGHT_EXCEPTION: ERROR:\n${err}\n\nORIGIN:\n${origin}`);});
process.on('unhandledRejection', (promise, reason) => {console.log(`UNHANDLED_REJECTION: REASON: \n${reason}\n\nPROMISE:\n${promise}`)});
process.on('warning', (...args) => {console.log('WARNING:\n', ...args)});


loadHandlers().then(() => client.login(process.env.TOKEN));
