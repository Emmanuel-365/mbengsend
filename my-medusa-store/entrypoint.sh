#!/bin/sh
# On ne quitte pas immédiatement en cas d'erreur pour voir le log
set +e

echo "--- DEMARRAGE DU SCRIPT D'ENTREE ---"
echo "Date : $(date)"
echo "CPU check : $(uptime)"

# On attend que Postgres soit vraiment prêt (on peut être très patient ici)
echo "Attente de 15 secondes pour stabiliser le CPU..."
sleep 15

echo "Vérification des fichiers..."
ls -F ./node_modules/.bin/medusa || echo "ALERTE: Binaire medusa introuvable !"

echo "Lancement des migrations Medusa (C'est ici que le CPU peut monter)..."
./node_modules/.bin/medusa db:migrate --verbose
MIGRATE_EXIT=$?

if [ $MIGRATE_EXIT -ne 0 ]; then
    echo "ERREUR : Les migrations ont échoué avec le code $MIGRATE_EXIT"
    # On ne quitte pas pour laisser le conteneur vivant et voir les logs dans Coolify
    sleep 3600
    exit 1
fi

echo "Migrations réussies. Démarrage du serveur Medusa..."
exec npm run start
