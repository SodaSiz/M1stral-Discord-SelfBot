import winston from 'winston';
import { promises as fs } from 'fs';
import path from 'path';

// Chemin du dossier Outputs
const outputsDir = path.join(__dirname, '../../Outputs');

// Fonction pour créer le dossier Outputs si il n'existe pas
const ensureOutputsDirExists = async () => {
    try {
        await fs.access(outputsDir);
    } catch (error) {
        // Le dossier n'existe pas, donc on le crée
        await fs.mkdir(outputsDir);
    }
};

// Création du logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(outputsDir, 'combined.log') })
    ],
});

// Assurer que le dossier Outputs existe avant de créer le logger
ensureOutputsDirExists().then(() => {}).catch((error) => {
    console.error('Erreur lors de la création du dossier Outputs :', error);
});

export default logger;

