import mongoose from "mongoose";
import logger from "../../../Logger/Logger"; // Ajustez le chemin en fonction de votre structure

export async function Database_Connection() {
  logger.info("Connection à la base de données");
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      // useNewUrlParser et useUnifiedTopology sont activés par défaut dans Mongoose 6.x
    });
    logger.info("Connécté à la base de données");
  } catch (err: any) {
    logger.error("Erreur de connection à la base de données:", err.message);
    process.exit(1);
  }
}
