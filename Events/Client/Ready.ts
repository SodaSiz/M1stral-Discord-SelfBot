import "dotenv/config";
import { ClientAttributes } from "../../Types/Client";
import { RichPresence } from "../../Utils/Misc/Settings/RPC/RichPresence";
import { CustomStatus } from "../../Utils/Misc/Settings/RPC/Status";
import { SpotifyRPC } from "../../Utils/Misc/Settings/RPC/Spotify";
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
