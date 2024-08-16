import { supabase } from "../Index";
import logger from "../../../../Components/Logger/Logger";

export async function disableRLS(rpcName: string, tableName: string) {
  try {
    // Désactiver RLS et créer/remplacer la politique en une seule opération
    const { error } = await supabase.rpc(rpcName, {
      sql: `
        ALTER TABLE public."${tableName}" DISABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS allow_all ON public."${tableName}";
        CREATE POLICY allow_all ON public."${tableName}" FOR ALL USING (true);
      `,
    });

    if (error) throw error;

    logger.info(
      `RLS désactivé et politique 'allow_all' gérée pour la table ${tableName}`
    );
  } catch (error) {
    logger.error(
      `Erreur lors de la gestion de RLS pour ${tableName}: ${error}`
    );
    throw error;
  }
}
