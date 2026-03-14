#!/bin/sh
set -e

echo "Attente de la base de données..."
sleep 10

echo "Lancement des migrations Medusa..."
./node_modules/.bin/medusa db:migrate

echo "Démarrage du serveur Medusa..."
exec npm run start
