export function splitJsonMessages(jsonString: string): string[] {
	const messages: string[] = [];
	let currentMessage = "";
	let currentSize = 0;
	const lines = jsonString.split("\n");

	for (const line of lines) {
		// Si ajouter la ligne dépasse la limite, on termine le message actuel et en commence un nouveau
		if (currentSize + line.length + 1 > 2000) {
			// 1 pour '\n'
			messages.push(currentMessage);
			currentMessage = line + "\n";
			currentSize = currentMessage.length;
		} else {
			// Ajoute la ligne au message actuel si cela ne dépasse pas la limite de caractères
			currentMessage += line + "\n";
			currentSize += line.length + 1;
		}
	}

	// Ajoute le dernier message restant
	if (currentMessage.length > 0) {
		messages.push(currentMessage);
	}

	return messages;
}
