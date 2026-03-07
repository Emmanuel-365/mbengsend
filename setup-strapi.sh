#!/bin/bash

echo "🚀 Installation automatique de Strapi CMS avec configuration..."

# Installer Strapi
echo "📦 Installation de Strapi..."
npx create-strapi-app@latest strapi-cms --quickstart --no-run

# Copier les templates de configuration
echo "📋 Copie des configurations..."
cp -r strapi-template/src/api/* strapi-cms/src/api/
cp strapi-template/config/middlewares.js strapi-cms/config/
cp strapi-template/config/plugins.js strapi-cms/config/

echo "✅ Strapi installé et configuré !"
echo ""
echo "📝 Les Content Types (Page et Banner) sont déjà configurés !"
echo ""
echo "🚀 Prochaines étapes :"
echo "1. Démarre Strapi : cd strapi-cms && npm run develop"
echo "2. Crée ton compte admin sur http://localhost:1337/admin"
echo "3. Configure les permissions publiques (voir ci-dessous)"
echo ""
echo "⚙️  Configuration des permissions (à faire une seule fois) :"
echo "   - Va dans Settings > Users & Permissions > Roles > Public"
echo "   - Active 'find' et 'findOne' pour Page et Banner"
echo "   - Save"
echo ""
echo "🔑 Génère un API Token :"
echo "   - Va dans Settings > API Tokens > Create new API Token"
echo "   - Nom: Storefront, Type: Read-only"
echo "   - Copie le token dans my-medusa-store-storefront/.env"
echo ""
echo "💡 Les Content Types sont déjà créés, tu peux directement créer du contenu !"
