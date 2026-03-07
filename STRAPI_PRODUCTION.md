# Guide de déploiement Strapi en production

## Configuration requise pour la production

### 1. Variables d'environnement

Copiez `.env.production.example` vers `.env` et modifiez les valeurs:

```bash
cp strapi-cms/.env.production.example strapi-cms/.env.production
```

**Variables critiques à changer:**

- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, etc. - Générez de nouvelles clés sécurisées
- `DATABASE_PASSWORD` - Mot de passe PostgreSQL sécurisé
- `MINIO_ACCESS_KEY` et `MINIO_SECRET_KEY` - Credentials MinIO sécurisés
- `MINIO_PUBLIC_URL` - URL publique de votre CDN/MinIO (ex: `https://cdn.votredomaine.com`)
- `CORS_ORIGINS` - Domaines autorisés (ex: `https://votredomaine.com,https://www.votredomaine.com`)

### 2. Configuration MinIO/CDN

Vous avez deux options pour servir les images en production:

#### Option A: MinIO avec reverse proxy Nginx (Recommandé)

1. Configurez Nginx pour proxy MinIO avec HTTPS:

```nginx
server {
    listen 443 ssl http2;
    server_name cdn.votredomaine.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:9200;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, HEAD, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' '*' always;
    }
}
```

2. Mettez à jour `MINIO_PUBLIC_URL=https://cdn.votredomaine.com`

#### Option B: Service S3 externe (AWS S3, DigitalOcean Spaces, etc.)

Remplacez MinIO par un vrai service S3 en production pour plus de fiabilité.

### 3. Configuration HTTPS

En production, utilisez HTTPS partout:

- Strapi admin: `https://admin.votredomaine.com`
- Storefront: `https://votredomaine.com`
- CDN/MinIO: `https://cdn.votredomaine.com`

Mettez à jour les variables:
- `MINIO_PUBLIC_URL=https://cdn.votredomaine.com`
- `CORS_ORIGINS=https://votredomaine.com,https://admin.votredomaine.com`

### 4. Sécurité

- Changez tous les secrets par défaut
- Utilisez des mots de passe forts
- Activez SSL pour PostgreSQL en production (`DATABASE_SSL=true`)
- Configurez un firewall pour limiter l'accès aux ports
- Utilisez des credentials MinIO sécurisés

### 5. Docker Compose en production

Créez un `docker-compose.prod.yml`:

```yaml
services:
  strapi:
    environment:
      NODE_ENV: production
      MINIO_PUBLIC_URL: https://cdn.votredomaine.com
      CORS_ORIGINS: https://votredomaine.com,https://www.votredomaine.com
```

Démarrez avec:
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 6. Checklist de déploiement

- [ ] Générer de nouvelles clés secrètes
- [ ] Configurer les variables d'environnement de production
- [ ] Configurer HTTPS avec certificats SSL
- [ ] Configurer le reverse proxy Nginx pour MinIO
- [ ] Mettre à jour CORS_ORIGINS avec vos domaines
- [ ] Mettre à jour MINIO_PUBLIC_URL avec votre CDN
- [ ] Tester l'upload et l'affichage des images
- [ ] Configurer les backups PostgreSQL
- [ ] Configurer les backups MinIO/S3

## Génération de clés sécurisées

Pour générer de nouvelles clés:

```bash
# Générer une clé aléatoire
openssl rand -base64 32
```

Utilisez cette commande pour générer chaque secret (APP_KEYS, API_TOKEN_SALT, etc.)
