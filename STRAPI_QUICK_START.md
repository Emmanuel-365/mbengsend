# Strapi - Installation Rapide (3 étapes)

## ✅ Ce qui est déjà fait

J'ai déjà intégré Strapi dans le code :
- ✅ Fonctions de fetching Strapi (`strapi.ts`)
- ✅ Composant Bannières sur la page d'accueil
- ✅ Liens CMS dans le footer
- ✅ Page CMS (`/pages/[handle]`) connectée à Strapi

## 🚀 Ce qu'il te reste à faire (3 étapes simples)

### Étape 1 : Installer Strapi (1 commande)

```bash
chmod +x setup-strapi.sh
./setup-strapi.sh
```

Ou manuellement :
```bash
npx create-strapi-app@latest strapi-cms --quickstart
```

### Étape 2 : Démarrer Strapi et créer ton compte

```bash
cd strapi-cms
npm run develop
```

Va sur http://localhost:1337/admin et crée ton compte admin.

### Étape 3 : Créer les Content Types dans Strapi

Dans l'admin Strapi, va dans **Content-Type Builder** :

#### A. Créer "Page"
1. Clique sur "Create new collection type"
2. Display name : `Page`
3. Ajoute ces champs :
   - `title` (Text, Required)
   - `handle` (UID, Required, attached to title)
   - `content` (Rich Text, Required)
   - `seo_title` (Text)
   - `seo_description` (Text)
   - `is_published` (Boolean, Default: false)
4. Save

#### B. Créer "Banner"
1. Clique sur "Create new collection type"
2. Display name : `Banner`
3. Ajoute ces champs :
   - `title` (Text, Required)
   - `image` (Media, Single image, Required)
   - `link` (Text)
   - `is_active` (Boolean, Default: true)
   - `position` (Number, Integer, Default: 0)
4. Save

#### C. Configurer les permissions
1. Va dans **Settings > Users & Permissions > Roles > Public**
2. Active ces permissions :
   - Page : `find` et `findOne`
   - Banner : `find` et `findOne`
3. Save

#### D. Générer un API Token
1. Va dans **Settings > API Tokens**
2. Clique sur "Create new API Token"
3. Nom : "Storefront"
4. Token type : "Read-only"
5. Copie le token généré

### Étape 4 : Configurer les variables d'environnement

Ajoute dans `my-medusa-store-storefront/.env` :

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=ton-token-ici
```

## 🎉 C'est tout !

Redémarre ton storefront et tu pourras :
- Créer des pages dans Strapi admin
- Créer des bannières avec images
- Les voir apparaître automatiquement sur le site

## 📝 Créer du contenu de test

Dans Strapi admin :

### Créer une page "À propos"
1. Va dans **Content Manager > Page**
2. Clique sur "Create new entry"
3. Title : "À propos"
4. Handle : "about" (auto-généré)
5. Content : Écris ton contenu
6. is_published : true
7. Save & Publish

La page sera accessible sur `/pages/about`

### Créer une bannière
1. Va dans **Content Manager > Banner**
2. Clique sur "Create new entry"
3. Title : "Promo"
4. Upload une image
5. Link : "/collections/summer" (optionnel)
6. is_active : true
7. position : 0
8. Save & Publish

La bannière apparaîtra sur la page d'accueil !

## 🐳 Bonus : Docker (optionnel)

Si tu veux Strapi dans Docker, ajoute dans `docker-compose.yml` :

```yaml
  strapi:
    image: strapi/strapi:latest
    container_name: medusa-strapi
    restart: unless-stopped
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: postgres
    volumes:
      - ./strapi-cms:/srv/app
    ports:
      - '1337:1337'
    depends_on:
      - postgres
```

Puis : `docker-compose up strapi`
