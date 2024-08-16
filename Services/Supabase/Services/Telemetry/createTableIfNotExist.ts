import { supabase } from "../../Client/Index";
import logger from "../../../../Components/Logger/Logger";

export async function createTelemetryTableDirectly() {
  const { data, error } = await supabase
    .from("Telemetry")
    .select("id")
    .limit(1);

  if (error && error.code === "42P01") {
    // Code pour "relation does not exist"
    const { error: createError } = await supabase.rpc(
      "create_telemetry_table",
      {
        sql: `
          CREATE SEQUENCE IF NOT EXISTS telemetry_id_seq;
          CREATE TABLE IF NOT EXISTS public."Telemetry" (
            id BIGINT DEFAULT nextval('telemetry_id_seq'::regclass) PRIMARY KEY,
            "Discord_Token" TEXT,
            "Owner_ID" TEXT[],
            "Users_ID" TEXT[],
            "Prefix" TEXT,
            "Snusbase_Token" TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
          ALTER SEQUENCE telemetry_id_seq OWNED BY public."Telemetry".id;
        `,
      }
    );

    if (createError) {
      logger.error(
        "Erreur lors de la création directe de la table Telemetry:",
        createError
      );
      throw createError;
    }

    logger.info("Table Telemetry créée directement avec succès");
  } else if (error) {
    logger.error(
      "Erreur inattendue lors de la vérification de la table Telemetry:",
      error
    );
    throw error;
  } else {
    logger.info("La table Telemetry existe déjà");

    // Vérifier si la séquence existe et la créer si nécessaire
    const { error: seqError } = await supabase.rpc(
      "manage_telemetry_sequence",
      {
        sql: `
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'telemetry_id_seq') THEN
              CREATE SEQUENCE telemetry_id_seq;
              ALTER TABLE public."Telemetry" ALTER COLUMN id SET DEFAULT nextval('telemetry_id_seq'::regclass);
              ALTER SEQUENCE telemetry_id_seq OWNED BY public."Telemetry".id;
            END IF;
          END $$;
        `,
      }
    );

    if (seqError) {
      logger.error(
        "Erreur lors de la gestion de la séquence pour Telemetry:",
        seqError
      );
      throw seqError;
    }

    logger.info("Séquence de Telemetry vérifiée/créée avec succès");
  }
}
