import { supabase } from "../Index";
import logger from "../../../../Components/Logger/Logger";

export async function ensureTableExist(table: string) {
  try {
    const { error } = await supabase.rpc(table);
    if (error) {
      logger.error(
        `Erreur RPC lors de la création de la table: ${table}`,
        error
      );
      throw error;
    }
    logger.info(`Table ${table} vérifiée/créée avec succès`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `Erreur lors de la vérification/création de la table: ${table}`,
        error.message
      );
    } else {
      logger.error(
        `Erreur inconnue lors de la vérification/création de la table: ${table}`,
        error
      );
    }
    throw error;
  }
}
