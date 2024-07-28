import fs from 'fs';
import path from 'path';

export async function make_json_snusbase(outputDir: string, filename: string, combinedResult: any) {
    // Définir le chemin complet du fichier, y compris les sous-répertoires
    const filePath = path.join(outputDir, filename + '.json');
    const fileDir = path.dirname(filePath);

    // Vérifier et créer les dossiers si nécessaire
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
    }

    // Sauvegarder les résultats JSON dans un fichier
    const jsonContent = JSON.stringify(combinedResult, null, 2); // Formater le JSON avec une indentation de 2 espaces
    fs.writeFileSync(filePath, jsonContent, 'utf8');
}
