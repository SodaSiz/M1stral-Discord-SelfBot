import logger from '../../Logger/Logger';
import { log_figlet } from '../../Misc/ASCII/Figlet';

export const exitHandler = (code: number) => {
    logger.info(`Le processus s'est arrêté avec le code ${code}`);
    console.log(log_figlet('Fin de tache...'), `Le processus s'est arrêté avec le code ${code}`);
};

