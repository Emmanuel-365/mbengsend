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

echo "Migrations completed"

# --- LE FIX CRUCIAL POUR L'ADMIN V2 ---
echo "Lien symbolique pour l'admin..."
# On crée le dossier s'il n'existe pas
mkdir -p /app/.medusa/server/.medusa
# On lie le dossier admin buildé vers l'endroit où le serveur compilé le cherche
ln -s /app/.medusa/admin /app/.medusa/server/.medusa/admin

echo "Démarrage du serveur Medusa..."
# On lance le serveur depuis la racine
exec ./node_modules/.bin/medusa start