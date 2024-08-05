import { Schema, model } from "mongoose";
import { ILogs } from "../../Types/Logs";

const LogSchema = new Schema<ILogs>({
  Filename: { type: String, required: true },
  Content: { type: String, required: true },
});

const Log = model<ILogs>("Log", LogSchema);

export default Log;
export type { ILogs };
