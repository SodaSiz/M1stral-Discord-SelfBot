import 'dotenv/config';
import { ClientAttributes } from '../../Types/Client'
import { RichPresence } from '../../Utils/Misc/RPC/RichPresence';
import { CustomStatus } from '../../Utils/Misc/RPC/Status';
import { SpotifyRPC } from '../../Utils/Misc/RPC/Spotify';
import { Telemetry_Connection } from '../../Utils/Misc/MongoDB/Telemetry';


export default {
  name: 'ready',
  async execute(client: ClientAttributes) {
    client.user?.setPresence({ activities: [await RichPresence.create(client), CustomStatus.create(client), SpotifyRPC.create(client)] });

    Telemetry_Connection();
  }    
};
