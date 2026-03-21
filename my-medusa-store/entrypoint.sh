#!/bin/sh
set +e

echo "--- DEMARRAGE DU SCRIPT D'ENTREE ---"
echo "NODE_ENV actuel : $NODE_ENV"
DB_HOST="postgres"

# Attendre Postgres
until pg_isready -h "$DB_HOST" -U "${DATABASE_USERNAME:-postgres}"; do
  echo "Postgres n'est pas prêt - attente..."
  sleep 2
done

echo "Postgres est prêt !"

echo "Lancement des migrations..."
npx medusa db:migrate

# echo "Lancement du seed..."
# npx medusa exec ./src/scripts/seed.sh || echo "Seed échoué ou déjà exécuté, on continue..."

echo "Vérification/Création du produit GP Service..."
npx medusa exec ./src/scripts/create-gp-product.ts || echo "Échec de création du produit GP, on continue..."

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

echo "Démarrage du serveur Medusa sur toutes les interfaces (0.0.0.0)..."
# On utilise directement la commande medusa du dossier bin
exec env HOST=0.0.0.0 ./node_modules/.bin/medusa start