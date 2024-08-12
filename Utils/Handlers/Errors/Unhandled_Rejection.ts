import logger from '../../../Components/Logger/Logger';
import { log_figlet } from '../../../Components/ASCII/Figlet';

export const unhandledRejectionHandler = (reason: any, promise: Promise<any>) => {
    logger.error(`UNHANDLED_REJECTION: REASON:\n${reason}\n\nPROMISE:\n${promise}`);
    console.log(log_figlet('Oops...'), `UNHANDLED_REJECTION: REASON:\n${reason}\n\nPROMISE:\n${promise}`);
};

