import winston from 'winston';
import { promises as fs } from 'fs';
import path from 'path';
import 'dotenv/config'
// Chemin du dossier Outputs
const outputsDir = path.join(process.env.LOGS_DIRECTORY || process.cwd(), '../../Misc/Logs/');

// Fonction pour créer le dossier Outputs si il n'existe pas
const ensureOutputsDirExists = async () => {
    try {
        await fs.access(outputsDir);
    } catch (error) {
        // Le dossier n'existe pas, donc on le crée
        await fs.mkdir(outputsDir);
    }
};

// Fonction pour créer le logger
const createLogger = () => {
    return winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: path.join(outputsDir, 'Errors.log'), level: 'error' }),
            new winston.transports.File({ filename: path.join(outputsDir, 'Warnings.log'), level: 'warn' }),
            new winston.transports.File({ filename: path.join(outputsDir, 'Infos.log'), level: 'info' }),
            new winston.transports.File({ filename: path.join(outputsDir, 'Debug.log'), level: 'debug' }),
            new winston.transports.File({ filename: path.join(outputsDir, 'Combined.log') })  // Pour tous les niveaux
        ],
    });
};

// Assurer que le dossier Outputs existe avant de créer le logger
ensureOutputsDirExists().catch((error) => {
  console.error('Erreur lors de la création du dossier Outputs :', error);
});

const logger = createLogger();

export default logger;
