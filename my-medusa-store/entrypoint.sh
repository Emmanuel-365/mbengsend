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

# Création de la base Strapi si elle n'existe pas
export PGPASSWORD="${DATABASE_PASSWORD:-postgres}"
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -tc "SELECT 1 FROM pg_database WHERE datname = 'strapi'" | grep -q 1 || \
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -c "CREATE DATABASE strapi"

# Lancement des migrations Medusa
echo "Lancement des migrations Medusa..."
./node_modules/.bin/medusa db:migrate

echo "Démarrage du serveur Medusa..."
exec npm run start
