import { Document } from "mongoose";

interface ILogs extends Document {
  Filename: string;
  Content: string;
}

export type { ILogs };
