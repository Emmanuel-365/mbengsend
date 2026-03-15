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

# Lancement des migrations (via le binaire local pour être sûr)
echo "Lancement des migrations Medusa..."
./node_modules/.bin/medusa db:migrate

# IMPORTANT : On reste dans /app (la racine)
echo "Démarrage du serveur Medusa..."

# On utilise la CLI locale. Elle sait gérer le dossier .medusa toute seule.
exec ./node_modules/.bin/medusa start