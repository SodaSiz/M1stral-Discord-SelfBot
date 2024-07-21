export function splitJsonMessages(jsonString: string, codeBlockWrapLength: number=0): string[] {
	const messages: string[] = [];
	let currentMessage = "";
	const lines = jsonString.split("\n");

	for (const line of lines) {
		// Si ajouter la ligne dépasse la limite, on termine le message actuel et en commence un nouveau
		if (currentMessage.length + line.length + 1 + codeBlockWrapLength > 2000) {  // +1 pour '\n'
			messages.push(currentMessage.trim());
			currentMessage = line + "\n";
		} else {
			// Ajoute la ligne au message actuel si cela ne dépasse pas la limite de caractères
			currentMessage += line + "\n";
		}
	}

	// Ajoute le dernier message restant
	if (currentMessage.length > 0) {
		messages.push(currentMessage.trim());
	}

	return messages;
}

