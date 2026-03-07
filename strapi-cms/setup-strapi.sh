#!/bin/bash

echo "🚀 Setting up Strapi CMS..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start PostgreSQL: docker-compose up -d postgres"
echo "2. Start Strapi: docker-compose up -d strapi"
echo "3. Access admin panel: http://localhost:1337/admin"
echo "4. Create your admin account"
echo "5. Configure public permissions (Settings → Users & Permissions → Roles → Public)"
echo "   - Enable find and findOne for Banner and Page"
echo "6. Generate API token (Settings → API Tokens)"
echo "7. Add token to my-medusa-store-storefront/.env.local"
echo ""
echo "📖 See STRAPI_CONFIG_SUMMARY.md for detailed instructions"