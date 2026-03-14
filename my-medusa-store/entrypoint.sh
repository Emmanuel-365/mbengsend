#!/bin/sh
set +e

echo "--- DEMARRAGE DU SCRIPT D'ENTREE ---"
echo "Attente de la base de données Postgres..."

# Extraire l'hôte de DATABASE_URL ou utiliser 'postgres'
DB_HOST="postgres"

# Attendre que Postgres réponde
until pg_isready -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}"; do
  echo "Postgres n'est pas prêt - attente..."
  sleep 2
done

echo "Postgres est prêt !"

# Création de la base Strapi si elle n'existe pas
echo "Vérification/Création de la base 'strapi'..."
export PGPASSWORD="${DATABASE_PASSWORD:-postgres}"
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -tc "SELECT 1 FROM pg_database WHERE datname = 'strapi'" | grep -q 1 || \
psql -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}" -c "CREATE DATABASE strapi"

echo "Lancement des migrations Medusa..."
./node_modules/.bin/medusa db:migrate --verbose
MIGRATE_EXIT=$?

if [ $MIGRATE_EXIT -ne 0 ]; then
    echo "ERREUR : Les migrations ont échoué !"
    sleep 3600
    exit 1
fi

echo "Migrations réussies. Lancement du serveur..."
exec npm run start
