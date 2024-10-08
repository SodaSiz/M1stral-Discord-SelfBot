import logger from '../../../Components/Logger/Logger';
import { log_figlet } from '../../../Components/ASCII/Figlet';

export const warningHandler = (warning: Error) => {
    logger.warn(`Warning: ${warning.name} - ${warning.message}`);
    console.log(log_figlet('Warning !'), warning);
};

