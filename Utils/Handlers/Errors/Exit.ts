import logger from '../../../Components/Logger/Logger';
import { log_figlet } from '../../../Components/ASCII/Figlet';

export const exitHandler = (code: number) => {
    logger.info(`Le processus s'est arrêté avec le code ${code}`);
    console.log(log_figlet('Fin de tache...'), `Le processus s'est arrêté avec le code ${code}`);
};

