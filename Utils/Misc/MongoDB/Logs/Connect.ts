import mongoose from "mongoose";
import logger from "../../../Logger/Logger";
import "dotenv/config";

export async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {});
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("Erreur de connection à la base de données MongoDB: ", error);
    return process.exit(1);
  }
}
