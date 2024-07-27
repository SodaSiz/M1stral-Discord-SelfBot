import { Client, Collection } from 'discord.js-selfbot-v13';
import type { ClientAttributes } from './Types/Client';
import 'dotenv/config';
import logger from './Utils/Logger/Logger';
import { attachErrorHandlers } from './Utils/Handlers/Errors/Attach_On_Error';
import { readStartupFile } from './Utils/Misc/ASCII/Startup';

// Création du client
const client = new Client() as ClientAttributes;
client.commands = new Collection();

// Fonction pour charger les gestionnaires dynamiquement
const loadHandlers = async (handlers: string[]) => {
    try {
        await Promise.all(handlers.map(async (handler) => {
            const module = await import(`./Utils/Handlers/Bot/${handler}`);
            if (module.default) {
                module.default(client);
            } else {
                logger.error(`Module ${handler} ne possède pas d'export par défaut`);
            }
        }));
    } catch (error) {
        logger.error(`Erreur lors du chargement des handlers : ${error}`);
    }
};

// Fonction principale pour initialiser le bot
(async () => {
    try {
        // Lire le fichier de démarrage
        await readStartupFile();
        
        // Attacher les gestionnaires d'erreurs
        attachErrorHandlers();
        
        // Charger les gestionnaires
        await loadHandlers(['Commands', 'Events']);  // Ajoutez ou retirez les noms de fichiers ici

        // Connexion du client
        await client.login(process.env.TOKEN);
        logger.info('Le client est connecté.');
    } catch (error) {
        logger.error(`Erreur lors de l'initialisation du client : ${error}`);
    }
})();
