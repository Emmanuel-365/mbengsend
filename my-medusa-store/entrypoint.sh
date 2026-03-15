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


echo "Préparation du dossier de production..."
# On s'assure que l'admin est bien accessible là où Medusa l'attend
cd /app/.medusa/server

# On lie le dossier admin pour qu'il soit visible depuis le serveur compilé
ln -s ../admin ./admin 

echo "Démarrage du serveur Medusa depuis le build..."
# On lance le binaire directement depuis le dossier compilé
exec node /app/.medusa/server/dist/main.js