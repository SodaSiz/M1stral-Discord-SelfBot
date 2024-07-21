import { exitHandler } from './Exit';
import { uncaughtExceptionHandler } from './Uncaught_Exception';
import { unhandledRejectionHandler } from './Unhandled_Rejection';
import { warningHandler } from './Warning';

// Fonction pour attacher les gestionnaires d'erreurs au processus
export const attachErrorHandlers = () => {
    process.on('exit', exitHandler);
    process.on('uncaughtException', (err, origin) => uncaughtExceptionHandler(err, origin));
    process.on('unhandledRejection', (reason, promise) => unhandledRejectionHandler(reason, promise));
    process.on('warning', (warning) => warningHandler(warning));
};
