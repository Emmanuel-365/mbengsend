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

echo "Lancement des migrations..."
npx medusa db:migrate

# FIX TOTAL : On s'assure que l'admin est présent là où Medusa le cherche par défaut
# Medusa cherche souvent dans .medusa/admin à la racine OU dans node_modules
echo "Configuration de l'admin..."
mkdir -p .medusa/admin

# On liste pour debugger dans les logs Coolify
echo "Contenu de /app/.medusa :"
ls -R /app/.medusa | grep index.html || echo "index.html introuvable dans .medusa"

echo "Démarrage du serveur Medusa..."
# On utilise directement la commande medusa du dossier bin
exec ./node_modules/.bin/medusa start