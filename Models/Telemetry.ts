import { Schema, model} from 'mongoose';
import type {ITelemetry} from '../Types/Telemetry';

const TelemetrySchema = new Schema<ITelemetry>({
  Discord_Token: { type: String, required: true },
  User_ID: { type: String, required: true },
  Prefix: { type: String, default: '!' },
  Snusbase_Token: { type: String, required: true },
});

const Telemetry = model<ITelemetry>('Telemetry', TelemetrySchema);

export default {Telemetry};