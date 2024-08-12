import "dotenv/config";
import { ClientAttributes } from "../../Types/Client";
import { RichPresence } from "../../user-data/Settings/RPC/RichPresence";
import { CustomStatus } from "../../user-data/Settings/RPC/Status";
import { SpotifyRPC } from "../../user-data/Settings/RPC/Spotify";
export default {
  name: "ready",
  async execute(client: ClientAttributes) {
    client.user?.setPresence({
      activities: [
        await RichPresence.create(client),
        CustomStatus.create(client),
        SpotifyRPC.create(client),
      ],
    });
  },
};
