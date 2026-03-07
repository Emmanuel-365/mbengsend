# Strapi - Configuration du stockage pour la production

## Recommandation: Utiliser MinIO (S3-compatible)

Tu as déjà MinIO configuré pour Medusa. On peut l'utiliser aussi pour Strapi.

### Avantages
- ✅ Déjà dans ton infrastructure
- ✅ Compatible S3 (standard de l'industrie)
- ✅ Scalable et performant
- ✅ Backups faciles
- ✅ Fonctionne avec CDN
- ✅ Pas de perte de fichiers lors des redéploiements

## Configuration

### 1. Installer le provider S3 pour Strapi

```bash
cd strapi-cms
npm install @strapi/provider-upload-aws-s3
```

### 2. Créer un bucket pour Strapi dans MinIO

Le bucket sera créé automatiquement ou tu peux le faire manuellement via l'interface MinIO (http://localhost:9001).

### 3. Configurer Strapi pour utiliser S3/MinIO

Créer/modifier `strapi-cms/config/plugins.ts`:

```typescript
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        credentials: {
          accessKeyId: env('MINIO_ACCESS_KEY', 'minioadmin'),
          secretAccessKey: env('MINIO_SECRET_KEY', 'minioadmin'),
        },
        region: env('MINIO_REGION', 'us-east-1'),
        params: {
          Bucket: env('MINIO_BUCKET', 'strapi-uploads'),
        },
        endpoint: env('MINIO_ENDPOINT', 'http://minio:9000'),
        s3ForcePathStyle: true, // Important pour MinIO
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

export default config;
```

### 4. Ajouter les variables d'environnement

Dans `strapi-cms/.env`:

```env
# MinIO/S3 Configuration
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_REGION=us-east-1
MINIO_BUCKET=strapi-uploads
MINIO_ENDPOINT=http://minio:9000
```

Dans `docker-compose.yml`, ajouter les variables d'environnement au service Strapi:

```yaml
strapi:
  environment:
    # ... autres variables ...
    MINIO_ACCESS_KEY: minioadmin
    MINIO_SECRET_KEY: minioadmin
    MINIO_REGION: us-east-1
    MINIO_BUCKET: strapi-uploads
    MINIO_ENDPOINT: http://minio:9000
```

### 5. Créer le bucket Strapi dans MinIO

Modifier le service `createbuckets` dans `docker-compose.yml`:

```yaml
createbuckets:
  image: minio/mc:latest
  container_name: medusa-createbuckets
  depends_on:
    - minio
  entrypoint: >
    /bin/sh -c "
    /usr/bin/mc config host add medusa http://minio:9000 minioadmin minioadmin;
    /usr/bin/mc mb medusa/medusa-bucket;
    /usr/bin/mc mb medusa/strapi-uploads;
    /usr/bin/mc anonymous set public medusa/medusa-bucket;
    /usr/bin/mc anonymous set public medusa/strapi-uploads;
    exit 0;
    "
```

## Configuration actuelle (Développement)

Pour le moment, j'ai configuré:
- **Dev**: Fichiers locaux dans `./strapi-cms/public/uploads` (facile à voir et tester)
- **Production**: Tu devras basculer vers MinIO/S3

## Migration Dev → Production

Quand tu passes en production:

1. Installe le provider S3: `npm install @strapi/provider-upload-aws-s3`
2. Configure `plugins.ts` comme ci-dessus
3. Ajoute les variables d'environnement
4. Redémarre Strapi
5. Les nouveaux uploads iront automatiquement dans MinIO

## Alternatives pour la production

### AWS S3 (si tu déploies sur AWS)
- Le plus fiable et scalable
- Intégration CDN CloudFront facile
- Coût: ~$0.023/GB/mois

### Cloudflare R2 (recommandé si budget serré)
- Compatible S3
- Pas de frais de sortie (egress)
- Coût: $0.015/GB/mois
- CDN Cloudflare inclus

### DigitalOcean Spaces
- Compatible S3
- Simple à configurer
- Coût: $5/mois pour 250GB + CDN

## Bonnes pratiques

1. **Backups**: Configure des backups automatiques du bucket
2. **CDN**: Utilise un CDN devant ton stockage (CloudFront, Cloudflare, etc.)
3. **Permissions**: En production, crée des credentials IAM spécifiques (pas minioadmin)
4. **Lifecycle**: Configure des règles de lifecycle pour supprimer les vieux fichiers
5. **Versioning**: Active le versioning sur le bucket pour éviter les pertes accidentelles

## Résumé

**Développement actuel:**
- Fichiers locaux: `./strapi-cms/public/uploads`
- Simple et rapide pour tester

**Production recommandée:**
- MinIO (déjà dans ton infra) ou S3
- Scalable, fiable, backupable
- Fonctionne avec load balancing

Veux-tu que je configure MinIO pour Strapi maintenant ou tu préfères garder la config locale pour le dev?
