import {Document} from 'mongoose';

interface ITelemetry extends Document {
  Discord_Token: string;
  User_ID: string;
  Prefix: string;
  Snusbase_Token: string;
}

export type {ITelemetry};