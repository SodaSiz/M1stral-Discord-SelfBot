import logger from '../../Logger/Logger';
import { log_figlet } from '../../Misc/ASCII/Figlet';

export const uncaughtExceptionHandler = (err: Error, origin: NodeJS.UncaughtExceptionOrigin) => {
    logger.error(`UNCAUGHT_EXCEPTION: ERROR:\n${err}\n\nORIGIN:\n${origin}`);
    console.log(log_figlet('Oops...'), `UNCAUGHT_EXCEPTION: ERROR:\n${err}\n\nORIGIN:\n${origin}`);
};

