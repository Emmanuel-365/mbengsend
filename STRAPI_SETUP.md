# Guide d'installation Strapi CMS

## Installation

### Option 1 : Installation rapide avec npx (Recommandé)

```bash
# Dans le dossier racine de ton projet
npx create-strapi-app@latest strapi-cms --quickstart
```

Cette commande va :
- Créer un dossier `strapi-cms/`
- Installer Strapi avec SQLite (base de données locale)
- Démarrer automatiquement Strapi sur http://localhost:1337

### Option 2 : Installation avec Docker

Ajoute ce service dans ton `docker-compose.yml` :

```yaml
  strapi:
    image: strapi/strapi:latest
    container_name: medusa-strapi
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: postgres
      JWT_SECRET: your-secret-key-here
      ADMIN_JWT_SECRET: your-admin-secret-key-here
      APP_KEYS: key1,key2,key3,key4
    volumes:
      - ./strapi-cms:/srv/app
    ports:
      - '1337:1337'
    depends_on:
      - postgres
```

## Configuration initiale

### 1. Créer le compte admin

Après le premier démarrage, va sur http://localhost:1337/admin et crée ton compte admin.

### 2. Créer les Content Types

Dans l'admin Strapi, va dans **Content-Type Builder** et crée :

#### A. Collection Type "Page"
- **Display name**: Page
- **API ID (Singular)**: page
- **API ID (Plural)**: pages

Champs :
- `title` (Text, Required)
- `handle` (UID, Required, attached to title)
- `content` (Rich Text, Required)
- `seo_title` (Text)
- `seo_description` (Text)
- `is_published` (Boolean, Default: false)

#### B. Collection Type "Banner"
- **Display name**: Banner
- **API ID (Singular)**: banner
- **API ID (Plural)**: banners

Champs :
- `title` (Text, Required)
- `image` (Media, Single, Required)
- `link` (Text)
- `is_active` (Boolean, Default: true)
- `position` (Number, Integer, Default: 0)

### 3. Configurer les permissions

Va dans **Settings > Users & Permissions Plugin > Roles > Public**

Active les permissions suivantes :
- **Page**: `find`, `findOne`
- **Banner**: `find`, `findOne`

Cela permet au storefront de lire les pages et bannières sans authentification.

## Configuration CORS

Pour permettre au storefront d'accéder à Strapi, édite `strapi-cms/config/middlewares.js` :

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:8000', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## Variables d'environnement

Ajoute dans ton `.env` du storefront :

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

Pour générer un API token :
1. Va dans **Settings > API Tokens**
2. Clique sur **Create new API Token**
3. Nom : "Storefront"
4. Token type : "Read-only"
5. Copie le token généré

## Démarrage

```bash
# Démarrer Strapi
cd strapi-cms
npm run develop

# Ou avec Docker
docker-compose up strapi
```

Strapi sera accessible sur http://localhost:1337/admin

## Prochaines étapes

Une fois Strapi configuré, je vais :
1. Créer les fonctions de fetching dans le storefront
2. Mettre à jour la page `/pages/[handle]` pour utiliser Strapi
3. Créer un composant pour afficher les bannières depuis Strapi
4. Supprimer l'ancien module CMS de Medusa (optionnel)
