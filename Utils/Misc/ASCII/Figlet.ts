import figlet from 'figlet';

export function log_figlet(text: string) {
	figlet(text, function (err, data) {
		if (err) 
			return console.log(`Une erreur inattendu est survenu lors de la conversion d'un texte en ascii figlet, voici l'erreur ainsi que le texte originel : \n\nTexte: ${text}\nErreur: ${err}`);

		console.log(data);
	})
}