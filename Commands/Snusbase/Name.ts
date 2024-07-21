import { Message } from "discord.js-selfbot-v13";
import type { ClientAttributes } from "../../Types/Client";
import { snusbase_discord_messages } from "../../Snusbase/Discord/Make_Message";

export default {
	name: "name",
	description:
		"Obtenir des informations avec le nom et le prénom d'une personne",
	usage: "<Prénom> <Nom>",
	args: true,
	run: async (client: ClientAttributes, message: Message, args: string[]) =>
		snusbase_discord_messages(`${args[0]} ${args[1]}`, "name", message),
};
