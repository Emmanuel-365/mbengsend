#!/bin/sh
set +e

echo "--- DEMARRAGE DU SCRIPT D'ENTREE ---"
DB_HOST="postgres"

# Attendre Postgres
until pg_isready -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}"; do
  echo "Postgres n'est pas prêt - attente..."
  sleep 2
done

echo "Postgres est prêt !"

# Création de la base Strapi
export PGPASSWORD="${DATABASE_PASSWORD:-postgres}"
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -tc "SELECT 1 FROM pg_database WHERE datname = 'strapi'" | grep -q 1 || \
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -c "CREATE DATABASE strapi"

# Migrations
echo "Lancement des migrations Medusa..."
./node_modules/.bin/medusa db:migrate

# --- NOUVEAU : Injection de la clé Publishable ---
# On utilise une clé fixe pour que le Storefront puisse la connaître à l'avance
FIXED_KEY="pk_01JKQB95H2N724Y5T3GCY5ETZP"
echo "Vérification de la clé publishable..."
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -d "medusa-store" -c "INSERT INTO publishable_api_key (id, token, name, created_at, updated_at) VALUES ('pk_prod', '$FIXED_KEY', 'Production Key', NOW(), NOW()) ON CONFLICT DO NOTHING;"

echo "Démarrage du serveur Medusa..."
exec npm run start
