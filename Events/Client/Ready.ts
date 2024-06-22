import type {ClientAttributes} from '../../Types/Client';
import 'dotenv/config';

export default {
  name: 'ready',
  execute(client: ClientAttributes) {
    console.log('Hackerman')
  }
}
