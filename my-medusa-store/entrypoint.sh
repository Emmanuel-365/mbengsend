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

# Vérification de l'admin
echo "Vérification de l'admin..."
if [ -f ".medusa/server/public/admin/index.html" ]; then
  echo "✓ Admin trouvé dans .medusa/server/public/admin/"
else
  echo "✗ ERREUR: Admin index.html non trouvé!"
  echo "Contenu de .medusa/server/public:"
  ls -la .medusa/server/public/ || echo "Dossier public non trouvé"
  exit 1
fi

echo "Démarrage du serveur Medusa..."
# On utilise directement la commande medusa du dossier bin
exec ./node_modules/.bin/medusa start