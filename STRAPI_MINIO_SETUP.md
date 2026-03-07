# Strapi + MinIO Configuration ✅

## Configuration Terminée

Strapi est maintenant configuré pour stocker tous les médias (images, vidéos, fichiers) dans MinIO au lieu du système de fichiers local.

## Architecture

```
Strapi Admin → Upload fichier → MinIO (S3-compatible) → Bucket: strapi-uploads
                                    ↓
                            Accessible via URL publique
                                    ↓
                            Storefront affiche l'image
```

## Configuration Appliquée

### 1. Provider S3 installé
```bash
@strapi/provider-upload-aws-s3
```

### 2. Configuration Strapi (`strapi-cms/config/plugins.ts`)
```typescript
upload: {
  config: {
    provider: 'aws-s3',
    providerOptions: {
      s3Options: {
        credentials: {
          accessKeyId: 'minioadmin',
          secretAccessKey: 'minioadmin',
        },
        region: 'us-east-1',
        params: {
          Bucket: 'strapi-uploads',
        },
        endpoint: 'http://minio:9000',
        forcePathStyle: true,
      },
    },
  },
}
```

### 3. Bucket MinIO créé
- **Nom**: `strapi-uploads`
- **Permissions**: Public (lecture)
- **Accessible**: http://localhost:9100/strapi-uploads

### 4. Variables d'environnement
```env
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_REGION=us-east-1
MINIO_BUCKET=strapi-uploads
MINIO_ENDPOINT=http://minio:9000
```

## Comment ça fonctionne

### Upload d'un fichier dans Strapi Admin

1. Tu vas dans Strapi Admin (http://localhost:1337/admin)
2. Tu crées un Banner ou une Page avec une image
3. Tu upload l'image via l'interface
4. Strapi envoie automatiquement l'image vers MinIO
5. L'image est stockée dans le bucket `strapi-uploads`
6. Strapi enregistre l'URL de l'image dans la base de données

### URL des fichiers

Les fichiers uploadés seront accessibles via:
```
http://localhost:9100/strapi-uploads/nom-du-fichier.jpg
```

Ou en production:
```
https://votre-domaine-minio.com/strapi-uploads/nom-du-fichier.jpg
```

## Avantages de cette configuration

✅ **Scalable**: Pas de limite de stockage
✅ **Persistant**: Les fichiers survivent aux redéploiements
✅ **Performant**: MinIO est optimisé pour les objets
✅ **Compatible CDN**: Facile d'ajouter CloudFlare ou autre CDN devant
✅ **Backupable**: Tu peux facilement backup le bucket MinIO
✅ **Multi-instance**: Si tu as plusieurs instances Strapi, elles partagent le même stockage

## Accès MinIO Console

Tu peux gérer les fichiers manuellement via l'interface MinIO:

- **URL**: http://localhost:9001
- **Username**: minioadmin
- **Password**: minioadmin

Dans la console, tu verras:
- Bucket `medusa-bucket` (pour Medusa)
- Bucket `strapi-uploads` (pour Strapi)

## Test de la configuration

### 1. Créer un Banner avec image

1. Va sur http://localhost:1337/admin
2. Content Manager → Banner → Create new entry
3. Remplis les champs:
   - Title: "Test Banner"
   - Upload une image
   - is_active: true
   - position: 0
4. Publish

### 2. Vérifier dans MinIO

1. Va sur http://localhost:9001
2. Login avec minioadmin/minioadmin
3. Clique sur le bucket `strapi-uploads`
4. Tu devrais voir ton image uploadée

### 3. Vérifier l'URL de l'image

L'API Strapi retournera quelque chose comme:
```json
{
  "image": {
    "url": "http://localhost:9100/strapi-uploads/image_123abc.jpg"
  }
}
```

## Configuration Production

Pour la production, tu devras:

### 1. Sécuriser les credentials
```env
MINIO_ACCESS_KEY=votre_access_key_securisee
MINIO_SECRET_KEY=votre_secret_key_securisee
```

### 2. Utiliser HTTPS
```env
MINIO_ENDPOINT=https://minio.votre-domaine.com
```

### 3. Configurer un CDN (optionnel mais recommandé)

Ajouter CloudFlare, CloudFront, ou autre CDN devant MinIO pour:
- Meilleure performance globale
- Cache des images
- Réduction de la bande passante

### 4. Backups automatiques

Configure des backups réguliers du bucket `strapi-uploads`:
```bash
# Exemple avec mc (MinIO Client)
mc mirror minio/strapi-uploads /backup/strapi-uploads
```

## Troubleshooting

### Les images ne s'uploadent pas

1. Vérifier que MinIO est démarré:
   ```bash
   docker compose ps minio
   ```

2. Vérifier les logs Strapi:
   ```bash
   docker compose logs strapi
   ```

3. Vérifier que le bucket existe:
   ```bash
   docker compose exec minio mc ls minio/
   ```

### Les images ne s'affichent pas

1. Vérifier que le bucket est public:
   ```bash
   docker compose exec minio mc anonymous get minio/strapi-uploads
   ```

2. Vérifier l'URL de l'image dans la réponse API

3. Tester l'accès direct:
   ```bash
   curl -I http://localhost:9100/strapi-uploads/votre-image.jpg
   ```

### Erreur de connexion à MinIO

Vérifier que Strapi peut atteindre MinIO:
```bash
docker compose exec strapi ping minio
```

## Migration des fichiers existants

Si tu avais déjà des fichiers dans `public/uploads`, tu peux les migrer vers MinIO:

```bash
# Copier les fichiers locaux vers MinIO
docker compose exec minio mc cp --recursive /srv/app/public/uploads/ minio/strapi-uploads/
```

## Commandes utiles

```bash
# Lister les fichiers dans le bucket
docker compose exec minio mc ls minio/strapi-uploads

# Voir la taille du bucket
docker compose exec minio mc du minio/strapi-uploads

# Supprimer un fichier
docker compose exec minio mc rm minio/strapi-uploads/fichier.jpg

# Backup du bucket
docker compose exec minio mc mirror minio/strapi-uploads /backup/
```

## Résumé

🎉 Strapi est maintenant configuré avec MinIO pour le stockage des médias!

- Tous les uploads vont automatiquement dans MinIO
- Les fichiers sont persistants et scalables
- Configuration prête pour la production
- Compatible avec CDN pour de meilleures performances
